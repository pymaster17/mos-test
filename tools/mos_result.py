#!/usr/bin/env python3
"""Show one submission's result table, exactly as the tester saw it at the end.

Fetch a single submission from D1 by its id (the UUID returned on submit) and
re-render the same per-item table that `formatResults` builds in beaqle.js:

  * NCMOS / PSCMOS -> Test | Competitor | CMOS (vs <baseline>) | time(ms)
  * MSMOS          -> Test | Model | MS-MOS | time(ms)
  * AB             -> Test Name and ID | time in ms | Preferred Model

Usage:
    export MOS_ADMIN_TOKEN="<admin token>"
    python3 tools/mos_result.py <tester-name>          # all their submissions
    python3 tools/mos_result.py <tester-name> --html out.html
    python3 tools/mos_result.py <submission-id>         # id / id-prefix also works
    python3 tools/mos_result.py <tester-name> --json    # dump the raw payload(s)

The positional argument is matched against the tester name first (a person may
have several submissions, one per experiment — all are shown), then falls back
to a submission id or unique id-prefix. The export endpoint has no server-side
filter, so we pull recent rows (--limit) and match client-side. The admin token
is the Worker's ADMIN_TOKEN secret — never hardcode it; pass --token or set
$MOS_ADMIN_TOKEN.
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.request

DEFAULT_ENDPOINT = "https://mos-results-api.pymaster17.workers.dev/api/submissions/export"


# --------------------------------------------------------------------------- fetch
def fetch_rows(endpoint: str, token: str, limit: int) -> list[dict]:
    if not token:
        sys.exit("ERROR: set MOS_ADMIN_TOKEN (or pass --token) to fetch from the server.")
    req = urllib.request.Request(
        f"{endpoint}?limit={limit}",
        headers={
            "Authorization": f"Bearer {token}",
            # Cloudflare's browser-integrity check (error 1010) rejects the
            # default python-urllib User-Agent, so present a normal one.
            "User-Agent": "curl/8.0 mos-result",
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
    return fetch_rows(args.endpoint, args.token, args.limit)


def find_rows(rows: list[dict], wanted: str) -> list[dict]:
    """Match by tester name (a person may have several submissions), falling
    back to submission id (exact or unique prefix) so ids still work."""
    def key(r):  # sort a person's submissions oldest-first for stable output
        return r.get("created_at", "")

    by_name = [r for r in rows if str(r.get("username", "")) == wanted]
    if by_name:
        return sorted(by_name, key=key)
    ci = [r for r in rows if str(r.get("username", "")).lower() == wanted.lower()]
    if ci:
        return sorted(ci, key=key)

    by_id = [r for r in rows if r.get("id") == wanted]
    if by_id:
        return by_id
    pref = [r for r in rows if str(r.get("id", "")).startswith(wanted)]
    if len(pref) == 1:
        return pref
    if len(pref) > 1:
        sys.exit(
            "ERROR: id prefix '%s' is ambiguous (%d matches):\n  %s"
            % (wanted, len(pref), "\n  ".join(r["id"] for r in pref))
        )

    names = sorted({str(r.get("username", "")) for r in rows})
    sys.exit(
        f"ERROR: no submission by tester or id '{wanted}' in the latest {len(rows)} rows.\n"
        "       Increase --limit if it is older. Known testers:\n       "
        + ", ".join(n for n in names if n)
    )


# --------------------------------------------------------------------------- table build
def build_table(payload: dict, mode: str) -> tuple[list[str], list[list[str]]]:
    """Return (headers, rows) mirroring the tester's end-of-test table."""
    test = payload.get("test", {})
    ev = test.get("evalResults", []) or []
    # keep only answered entries (a skipped one is just {"TestID": ...})
    answered = [e for e in ev if len(e) > 1]

    def testcol(e):
        name = e.get("Name") or e.get("TestID", "")
        tid = e.get("TestID", "")
        return f"{name} ({tid})" if name and name != tid else str(tid)

    if mode in ("NCMOS", "PSCMOS"):
        baseline = next((e.get("BaselineModel") for e in answered if e.get("BaselineModel")), "VocalRender")
        headers = ["Test", "Competitor", f"CMOS (vs {baseline})", "time(ms)"]
        rows = []
        for e in answered:
            cv = e.get("CmosValue", 0)
            rows.append([
                testcol(e),
                str(e.get("CompetitorModel", "")),
                ("+" if isinstance(cv, (int, float)) and cv > 0 else "") + str(cv),
                str(e.get("Runtime", 0)),
            ])
        return headers, rows

    if mode == "MSMOS":
        headers = ["Test", "Model", "MS-MOS", "time(ms)"]
        rows = [[
            testcol(e),
            str(e.get("Model", "")),
            str(e.get("MsMosScore", "")),
            str(e.get("Runtime", 0)),
        ] for e in answered]
        return headers, rows

    if mode == "AB":
        headers = ["Test Name and ID", "time in ms", "Preferred Model"]
        rows = [[
            testcol(e),
            str(e.get("Runtime", 0)),
            str(e.get("PreferredModel", "")),
        ] for e in answered]
        return headers, rows

    # unknown mode: dump each entry's key/value pairs generically
    keys = []
    for e in answered:
        for k in e:
            if k not in keys:
                keys.append(k)
    headers = keys
    rows = [[str(e.get(k, "")) for k in keys] for e in answered]
    return headers, rows


# --------------------------------------------------------------------------- text render
def _w(s: str) -> int:
    """Display width: CJK / fullwidth chars count as 2 columns."""
    total = 0
    for ch in s:
        o = ord(ch)
        wide = (
            0x1100 <= o <= 0x115F or 0x2E80 <= o <= 0xA4CF or 0xAC00 <= o <= 0xD7A3
            or 0xF900 <= o <= 0xFAFF or 0xFE30 <= o <= 0xFE4F or 0xFF00 <= o <= 0xFF60
            or 0xFFE0 <= o <= 0xFFE6 or 0x20000 <= o <= 0x3FFFD
        )
        total += 2 if wide else 1
    return total


def _pad(s: str, width: int) -> str:
    return s + " " * max(0, width - _w(s))


def render_text(headers: list[str], rows: list[list[str]]) -> str:
    cols = len(headers)
    widths = [_w(headers[c]) for c in range(cols)]
    for r in rows:
        for c in range(cols):
            widths[c] = max(widths[c], _w(r[c]))
    out = []
    out.append(" | ".join(_pad(headers[c], widths[c]) for c in range(cols)))
    out.append("-+-".join("-" * widths[c] for c in range(cols)))
    for r in rows:
        out.append(" | ".join(_pad(r[c], widths[c]) for c in range(cols)))
    return "\n".join(out)


def summary_line(mode: str, rows: list[list[str]]) -> str:
    """Extra aggregate line (not shown to the tester) for a quick sanity read."""
    if not rows:
        return ""
    try:
        if mode in ("NCMOS", "PSCMOS"):
            vals = [float(r[2]) for r in rows]
            return f"平均 CMOS = {sum(vals)/len(vals):+.3f}  (n={len(vals)}, 正=竞品优于基准)"
        if mode == "MSMOS":
            vals = [float(r[2]) for r in rows]
            return f"平均 MS-MOS = {sum(vals)/len(vals):.3f}  (n={len(vals)}, 满分 4)"
    except ValueError:
        return ""
    return ""


# --------------------------------------------------------------------------- html render
def html_section(meta: dict, headers: list[str], rows: list[list[str]]) -> str:
    """One submission's meta block + table (a fragment, no <html> wrapper)."""
    import html as _h

    def td(cells, tag="td"):
        return "".join(f"<{tag}>{_h.escape(str(c))}</{tag}>" for c in cells)

    body_rows = "\n".join(f"<tr>{td(r)}</tr>" for r in rows)
    metahtml = "".join(
        f"<div><b>{_h.escape(k)}:</b> {_h.escape(str(v))}</div>" for k, v in meta.items()
    )
    return f"""<section>
<div class="meta">{metahtml}</div>
<table><thead><tr>{td(headers, 'th')}</tr></thead>
<tbody>
{body_rows}
</tbody></table>
</section>"""


def html_document(title: str, sections: list[str]) -> str:
    import html as _h
    return f"""<!doctype html>
<html lang="zh"><head><meta charset="utf-8">
<title>{_h.escape(title)}</title>
<style>
  body {{ font-family: system-ui, "Segoe UI", Arial, sans-serif; margin: 2em; color: #222; }}
  section {{ margin-bottom: 2.5em; }}
  .meta {{ margin-bottom: 1em; line-height: 1.6; }}
  table {{ border-collapse: collapse; width: 100%; }}
  th, td {{ border: 1px solid #bbb; padding: 6px 10px; text-align: left; }}
  th {{ background: #f0f0f0; }}
  tr:nth-child(even) td {{ background: #fafafa; }}
</style></head><body>
{"".join(sections)}
</body></html>
"""


# --------------------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser(
        description="Show a tester's result table(s), as seen at the end of the test.")
    ap.add_argument("who", help="tester name (all their submissions), or a submission id / id-prefix")
    ap.add_argument("--endpoint", default=DEFAULT_ENDPOINT)
    ap.add_argument("--token", default=os.environ.get("MOS_ADMIN_TOKEN", ""),
                    help="admin token (default: $MOS_ADMIN_TOKEN)")
    ap.add_argument("--limit", type=int, default=1000,
                    help="how many recent rows to search (default 1000)")
    ap.add_argument("--from-file", help="read a saved export JSON instead of the server")
    ap.add_argument("--json", action="store_true", help="print the raw payload JSON and exit")
    ap.add_argument("--html", metavar="PATH", help="also write an HTML table to PATH")
    args = ap.parse_args()

    rows = load_rows(args)
    matches = find_rows(rows, args.who)

    if args.json:
        payloads = [
            json.loads(r["payload_json"]) if isinstance(r.get("payload_json"), str)
            else r.get("payload_json", {})
            for r in matches
        ]
        print(json.dumps(payloads if len(payloads) > 1 else payloads[0],
                         ensure_ascii=False, indent=2))
        return

    if len(matches) > 1:
        print(f"受试者 '{args.who}' 共 {len(matches)} 份提交:\n")

    html_sections = []
    for row in matches:
        payload = (json.loads(row["payload_json"]) if isinstance(row.get("payload_json"), str)
                   else row.get("payload_json", {}))
        part = payload.get("participant", {})
        test = payload.get("test", {})
        mode = row.get("test_mode") or test.get("mode", "")

        meta = {
            "id": row.get("id", ""),
            "受试者": part.get("userName", "") or "(anonymous)",
            "邮箱": part.get("userEmail", "") or "—",
            "实验": test.get("name", "") or mode,
            "mode": mode,
            "提交时间": payload.get("submittedAt", "") or row.get("created_at", ""),
            "备注": part.get("userComment", "") or "—",
        }
        headers, table = build_table(payload, mode)

        # ----- terminal output
        print("=" * 72)
        for k, v in meta.items():
            print(f"{k:>8}: {v}")
        print("=" * 72)
        print(render_text(headers, table))
        extra = summary_line(mode, table)
        if extra:
            print("-" * 72)
            print(extra)
        print(f"\n共 {len(table)} 题。\n")

        if args.html:
            html_sections.append(html_section(meta, headers, table))

    if args.html:
        with open(args.html, "w", encoding="utf-8") as f:
            f.write(html_document(f"Results: {args.who}", html_sections))
        print(f"HTML 已写入 {args.html}")


if __name__ == "__main__":
    main()
