#!/usr/bin/env python3
"""Unified VocalRender listening-test report: fetch from D1 + render tables/images.

One program does everything:
  1. fetch submissions from the Cloudflare Worker (D1 export)
  2. aggregate per participant and per model
  3. print two text tables, and
  4. render two PNGs (participation, scores)

Usage:
    export MOS_ADMIN_TOKEN="<admin token>"
    python3 tools/mos_report.py                     # text + PNGs into ./report_img
    python3 tools/mos_report.py --outdir out         # choose image dir
    python3 tools/mos_report.py --no-images          # text tables only
    python3 tools/mos_report.py --from-file dump.json # offline, from a saved export
    python3 tools/mos_report.py --json               # machine-readable JSON to stdout

Images need Pillow + a CJK font. Pillow is auto-located from a local unpacked
wheel dir (see PYLIB_CANDIDATES / $MOS_PYLIBS); if unavailable, the program still
prints the text tables and just skips the images.
The admin token is the Worker's ADMIN_TOKEN secret — never hardcode it.
Every submitted rating is counted as-is; no per-sample filtering is applied.
"""
from __future__ import annotations

import argparse
import json
import math
import os
import sys
import urllib.request
from collections import defaultdict

# --------------------------------------------------------------------------- config
DEFAULT_ENDPOINT = "https://mos-results-api.pymaster17.workers.dev/api/submissions/export"
MODES = ("NCMOS", "PSCMOS", "MSMOS")
BASELINE = "VocalRender"
# users whose submissions are ignored (probe smoke-test only; test_1 counts as real)
SMOKE_USERS = {"probe_diag"}
MODEL_ORDER = ["VocalRender", "VocalRender-Pro", "SoulX-Singer",
               "TechSinger", "TCSinger", "Vevo2"]

# where a locally-unpacked Pillow wheel may live (no system install needed)
PYLIB_CANDIDATES = [
    os.environ.get("MOS_PYLIBS", ""),
    os.path.expanduser("~/.venvs/pylibs"),
]
FONT_CANDIDATES = [
    os.environ.get("MOS_CJK_FONT", ""),
    os.path.expanduser("~/.fonts/NotoSansSC-Regular.ttf"),
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
]


def find_pillow():
    """Return the PIL module, adding a local unpacked-wheel dir to sys.path if needed."""
    try:
        import PIL  # noqa: F401
        return True
    except ImportError:
        pass
    for cand in PYLIB_CANDIDATES:
        if cand and os.path.isdir(cand) and cand not in sys.path:
            sys.path.insert(0, cand)
            try:
                import PIL  # noqa: F401
                return True
            except ImportError:
                sys.path.remove(cand)
    return False


def find_font():
    for cand in FONT_CANDIDATES:
        if cand and os.path.exists(cand):
            return cand
    return None


# --------------------------------------------------------------------------- fetch
def fetch_live(endpoint: str, token: str, limit: int) -> list[dict]:
    if not token:
        sys.exit("ERROR: set MOS_ADMIN_TOKEN (or pass --token) to fetch from the server.")
    req = urllib.request.Request(
        f"{endpoint}?limit={limit}",
        headers={
            "Authorization": f"Bearer {token}",
            # Cloudflare's browser-integrity check (error 1010) rejects the
            # default python-urllib User-Agent, so present a normal one.
            "User-Agent": "curl/8.0 mos-report",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            body = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        sys.exit(f"ERROR: server returned HTTP {exc.code}: {exc.read().decode(errors='replace')}")
    except urllib.error.URLError as exc:
        sys.exit(f"ERROR: could not reach {endpoint}: {exc}")
    return json.loads(body).get("results", [])


def load_rows(args) -> list[dict]:
    if args.from_file:
        data = json.load(open(args.from_file, encoding="utf-8"))
        return data.get("results", data) if isinstance(data, dict) else data
    return fetch_live(args.endpoint, args.token, args.limit)


# --------------------------------------------------------------------------- aggregate
def eval_results(payload: dict) -> list[dict]:
    test = payload.get("test") or {}
    if isinstance(test.get("evalResults"), list):
        return test["evalResults"]
    if isinstance(payload.get("results"), list):
        return payload["results"]
    return []


def collect(rows: list[dict]):
    submissions = []
    ratings = {m: [] for m in MODES}
    for r in rows:
        mode = r.get("test_mode")
        user = r.get("username") or "(anon)"
        if mode not in MODES or user in SMOKE_USERS:
            continue
        try:
            payload = json.loads(r.get("payload_json") or "{}")
        except (TypeError, ValueError):
            payload = {}
        entries = [e for e in eval_results(payload) if isinstance(e, dict)]
        submissions.append({"user": user, "mode": mode,
                            "count": len(entries), "created_at": r.get("created_at", "")})
        for e in entries:
            if mode in ("NCMOS", "PSCMOS"):
                comp, val = e.get("CompetitorModel"), e.get("CmosValue")
                if comp and isinstance(val, (int, float)):
                    ratings[mode].append({"model": comp, "value": val, "user": user})
            else:
                model, score = e.get("Model"), e.get("MsMosScore")
                if model and isinstance(score, (int, float)):
                    ratings[mode].append({"model": model, "value": score, "user": user})
    return submissions, ratings


def stats(values):
    n = len(values)
    mean = sum(values) / n if n else 0.0
    if n >= 2:
        sd = math.sqrt(sum((v - mean) ** 2 for v in values) / (n - 1))
        sem = sd / math.sqrt(n)
    else:
        sd = sem = 0.0
    return {"n": n, "mean": mean, "sd": sd, "ci": 1.96 * sem}


def per_model_stats(rows):
    buckets = defaultdict(list)
    for r in rows:
        buckets[r["model"]].append(r["value"])
    return {m: stats(v) for m, v in buckets.items()}


def ordered_models(stats_by):
    present = set().union(*[set(s) for s in stats_by.values()]) if any(stats_by.values()) else set()
    return [m for m in MODEL_ORDER if m in present] + \
           [m for m in sorted(present) if m not in MODEL_ORDER]


# --------------------------------------------------------------------------- text tables
def print_text(submissions, ratings):
    users = sorted({s["user"] for s in submissions})
    grid = {u: {} for u in users}          # grid[user][mode] = {"n": ratings, "takes": count}
    for s in submissions:
        cell = grid[s["user"]].setdefault(s["mode"], {"n": 0, "takes": 0})
        cell["n"] += s["count"]            # sum ratings across genuine repeat takes
        cell["takes"] += 1

    ucol = max([len("受试者 / tester")] + [len(u) for u in users]) + 2
    print("=" * 68)
    print(" 测试者 / 已提交测试   (✓n = 已交，n=有效评分条数；×k = 做了 k 次；— = 未交)")
    print("=" * 68)
    header = f"{'受试者 / tester':<{ucol}}" + "".join(f"{m:>12}" for m in MODES) + f"{'完成':>8}"
    print(header)
    print("-" * len(header))
    tot = {m: 0 for m in MODES}
    for u in users:
        cells = ""
        done = 0
        for m in MODES:
            if m in grid[u]:
                c = grid[u][m]
                label = "✓" + str(c["n"]) + (f"×{c['takes']}" if c["takes"] > 1 else "")
                cells += f"{label:>12}"
                done += 1
                tot[m] += c["takes"]       # 合计份数 counts every take
            else:
                cells += f"{'—':>12}"
        print(f"{u:<{ucol}}{cells}{str(done)+'/3':>8}{' ★' if done==3 else ''}")
    print("-" * len(header))
    print(f"{'合计份数':<{ucol}}" + "".join(f"{tot[m]:>12}" for m in MODES))
    print(f"\n受试者 {len(users)} 人 | 提交 {len(submissions)} 份 | "
          f"做全 3 项 {sum(1 for u in users if len(grid[u])==3)} 人\n")

    stats_by = {m: per_model_stats(ratings[m]) for m in MODES}
    models = ordered_models(stats_by)
    print("=" * 68)
    print(" 模型 × 实验分数   (数值 = 均值 ±95%CI (N))")
    print("=" * 68)
    w = 20
    mcol = max([len("model")] + [len(m) for m in models]) + 2
    head = f"{'model':<{mcol}}" + "".join(f"{m:>{w}}" for m in ('N-CMOS', 'PS-CMOS', 'MS-MOS'))
    print(head)
    print("-" * len(head))
    for model in models:
        cells = ""
        for mode in MODES:
            s = stats_by[mode].get(model)
            if not s:
                txt = "基准" if (mode in ("NCMOS", "PSCMOS") and model == BASELINE) else "—"
            else:
                sign = "+" if mode in ("NCMOS", "PSCMOS") else ""
                txt = f"{s['mean']:{sign}.2f}±{s['ci']:.2f}(n={s['n']})"
            cells += f"{txt:>{w}}"
        print(f"{model:<{mcol}}{cells}")
    print("-" * len(head))
    print("  N-CMOS / PS-CMOS = CMOS 相对 VocalRender（正=优于基准，负=劣于；基准自身不打分）")
    print("  MS-MOS = 绝对分 1-4（越高越符合乐谱）\n")


# --------------------------------------------------------------------------- image tables
BG = (255, 255, 255)
FG = (30, 34, 36)
MUTED = (110, 120, 125)
LINE = (210, 205, 190)
HEAD_BG = (243, 239, 230)
STAR = (196, 130, 20)
POS = (14, 110, 90)
NEG = (150, 60, 60)
PAD, ROW_H = 16, 34


def draw_table(rows, aligns, colors, title, subtitle, out_path, font_path,
               header_rows=1, fsz=20):
    from PIL import Image, ImageDraw, ImageFont

    def font(sz):
        try:
            return ImageFont.truetype(font_path, sz)
        except OSError:
            return ImageFont.load_default()

    f, ft, fs = font(fsz), font(fsz + 6), font(fsz - 4)
    d0 = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    ncol = len(rows[0])
    colw = [0] * ncol
    for r in rows:
        for c in range(ncol):
            colw[c] = max(colw[c], int(d0.textlength(r[c], font=f)))
    colw = [w + 24 for w in colw]
    table_w = sum(colw)
    title_h, sub_h = (34 if title else 0), (26 if subtitle else 0)
    text_w = max([0]
                 + ([int(d0.textlength(title, font=ft))] if title else [])
                 + ([int(d0.textlength(subtitle, font=fs))] if subtitle else []))
    W = max(table_w, text_w) + 2 * PAD
    H = 2 * PAD + title_h + sub_h + ROW_H * len(rows) + 8

    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    y = PAD
    if title:
        d.text((PAD, y), title, font=ft, fill=FG); y += title_h
    if subtitle:
        d.text((PAD, y), subtitle, font=fs, fill=MUTED); y += sub_h

    x0, top = PAD, y
    d.rectangle([x0, top, x0 + table_w, top + ROW_H * header_rows], fill=HEAD_BG)
    for ri, row in enumerate(rows):
        ry = top + ri * ROW_H
        x = x0
        for c in range(ncol):
            cell = row[c]
            fill = FG if ri < header_rows else (colors.get((ri, c)) or FG)
            tw = d.textlength(cell, font=f)
            tx = x + 12 if aligns[c] == "l" else (x + colw[c] - 12 - tw if aligns[c] == "r"
                                                  else x + (colw[c] - tw) / 2)
            ty = ry + (ROW_H - fsz) / 2 - 2
            d.text((tx, ty), cell, font=f, fill=fill)
            if ri < header_rows:
                d.text((tx + 0.6, ty), cell, font=f, fill=fill)  # faux-bold
            x += colw[c]
        colr = LINE if (ri == header_rows - 1 or ri == len(rows) - 1) else (238, 233, 222)
        d.line([x0, ry + ROW_H, x0 + table_w, ry + ROW_H], fill=colr,
               width=2 if colr == LINE else 1)
    d.rectangle([x0, top, x0 + table_w, top + ROW_H * len(rows)], outline=LINE, width=2)
    img.save(out_path)
    return out_path


def build_participation(submissions):
    users = sorted({s["user"] for s in submissions})
    grid = {u: {} for u in users}          # grid[user][mode] = {"n": ratings, "takes": count}
    for s in submissions:
        cell = grid[s["user"]].setdefault(s["mode"], {"n": 0, "takes": 0})
        cell["n"] += s["count"]
        cell["takes"] += 1
    rows = [["受试者 / tester", "N-CMOS", "PS-CMOS", "MS-MOS", "完成"]]
    colors, tot = {}, {m: 0 for m in MODES}
    for ri, u in enumerate(users, start=1):
        done, cells = 0, [u]
        for ci, m in enumerate(MODES, start=1):
            if m in grid[u]:
                c = grid[u][m]
                cells.append(f"✓ {c['n']}" + (f" ×{c['takes']}" if c["takes"] > 1 else ""))
                colors[(ri, ci)] = POS; done += 1; tot[m] += c["takes"]
            else:
                cells.append("—"); colors[(ri, ci)] = MUTED
        cells.append(f"{done}/3" + ("  ★" if done == 3 else ""))
        if done == 3:
            colors[(ri, 4)] = STAR
        rows.append(cells)
    rows.append(["合计份数", str(tot["NCMOS"]), str(tot["PSCMOS"]), str(tot["MSMOS"]), ""])
    sub = (f"✓ n = 已提交（n 条有效评分）;— = 未交;★ = 做全 3 项  |  "
           f"{len(users)} 人 / {len(submissions)} 份 / 全做 {sum(1 for u in users if len(grid[u])==3)} 人")
    return rows, ["l", "c", "c", "c", "c"], colors, "测试者 × 已提交测试", sub


def build_scores(ratings):
    stats_by = {m: per_model_stats(ratings[m]) for m in MODES}
    models = ordered_models(stats_by)
    rows = [["model", "N-CMOS", "PS-CMOS", "MS-MOS"]]
    colors = {}
    for ri, model in enumerate(models, start=1):
        cells = [model]
        for ci, mode in enumerate(MODES, start=1):
            s = stats_by[mode].get(model)
            if not s:
                cells.append("基准" if (mode in ("NCMOS", "PSCMOS") and model == BASELINE) else "—")
                colors[(ri, ci)] = MUTED
                continue
            sign = "+" if mode in ("NCMOS", "PSCMOS") else ""
            cells.append(f"{s['mean']:{sign}.2f} ±{s['ci']:.2f}  (n={s['n']})")
            colors[(ri, ci)] = (POS if s["mean"] > 0 else NEG) if mode in ("NCMOS", "PSCMOS") else FG
        rows.append(cells)
    sub = ("N-CMOS / PS-CMOS = CMOS 相对 VocalRender（正=优于基准，负=劣于）;  "
           "MS-MOS = 绝对分 1-4（越高越符合乐谱）")
    return rows, ["l", "c", "c", "c"], colors, "模型 × 实验分数（均值 ±95%CI, N）", sub


def render_images(submissions, ratings, outdir):
    if not find_pillow():
        print("⚠ 未找到 Pillow，跳过出图（仍已输出文本表）。"
              "\n  可设 MOS_PYLIBS 指向已解压的 Pillow wheel 目录，或看脚本顶部说明。",
              file=sys.stderr)
        return []
    font_path = find_font()
    if not font_path:
        print("⚠ 未找到中文字体，跳过出图。设 MOS_CJK_FONT 指向一个 CJK .ttf/.ttc。",
              file=sys.stderr)
        return []
    os.makedirs(outdir, exist_ok=True)
    p1 = os.path.join(outdir, "participation.png")
    p2 = os.path.join(outdir, "scores.png")
    draw_table(*build_participation(submissions), out_path=p1, font_path=font_path)
    draw_table(*build_scores(ratings), out_path=p2, font_path=font_path)
    return [p1, p2]


# --------------------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--endpoint", default=DEFAULT_ENDPOINT)
    ap.add_argument("--token", default=os.environ.get("MOS_ADMIN_TOKEN", ""),
                    help="admin token (default: $MOS_ADMIN_TOKEN)")
    ap.add_argument("--limit", type=int, default=1000)
    ap.add_argument("--from-file", help="read a saved export JSON instead of fetching")
    ap.add_argument("--outdir", default="report_img", help="directory for the PNGs")
    ap.add_argument("--no-images", action="store_true", help="text tables only")
    ap.add_argument("--json", action="store_true", help="print machine-readable JSON and exit")
    args = ap.parse_args()

    rows = load_rows(args)
    submissions, ratings = collect(rows)

    if args.json:
        print(json.dumps({
            "participation": submissions,
            "experiments": {m: per_model_stats(ratings[m]) for m in MODES},
        }, ensure_ascii=False, indent=2))
        return
    if not submissions:
        print("没有有效提交数据。")
        return

    print_text(submissions, ratings)
    if not args.no_images:
        made = render_images(submissions, ratings, args.outdir)
        if made:
            print("图片已生成 / images written:")
            for p in made:
                print("  ", os.path.abspath(p))


if __name__ == "__main__":
    main()
