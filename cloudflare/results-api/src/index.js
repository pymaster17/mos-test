const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
};

function getAllowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function resolveCorsOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) {
    return "";
  }

  const allowedOrigins = getAllowedOrigins(env);
  if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    return origin;
  }

  return null;
}

function buildCorsHeaders(request, env) {
  const corsOrigin = resolveCorsOrigin(request, env);
  const headers = {
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Token",
    Vary: "Origin",
  };

  if (corsOrigin) {
    headers["Access-Control-Allow-Origin"] = corsOrigin;
  }

  return headers;
}

function jsonResponse(body, init = {}, request, env) {
  const headers = new Headers(init.headers || {});
  const corsHeaders = buildCorsHeaders(request, env);

  Object.entries(JSON_HEADERS).forEach(([key, value]) => headers.set(key, value));
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));

  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers,
  });
}

function errorResponse(message, status, request, env) {
  return jsonResponse(
    {
      success: false,
      message,
    },
    { status },
    request,
    env,
  );
}

function sanitizeString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function getPagePath(payload) {
  return sanitizeString(
    payload?.test?.page ||
      payload?.test?.pagePath ||
      payload?.test?.href ||
      payload?.test?.pageURL ||
      payload?.test?.pageUrl,
    1024,
  );
}

function getEvalResults(payload) {
  if (Array.isArray(payload?.test?.evalResults)) {
    return payload.test.evalResults;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getAdminToken(request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return request.headers.get("X-Admin-Token") || "";
}

function validateSubmission(payload) {
  const userName = sanitizeString(payload?.participant?.userName, 128);
  const testName = sanitizeString(payload?.test?.name, 255);
  const testMode = sanitizeString(payload?.test?.mode, 32);
  const pagePath = getPagePath(payload);
  const evalResults = getEvalResults(payload);

  if (!userName) {
    return "participant.userName is required.";
  }
  if (!testName) {
    return "test.name is required.";
  }
  if (!testMode) {
    return "test.mode is required.";
  }
  if (!pagePath) {
    return "test.page is required.";
  }
  if (!Array.isArray(evalResults) || evalResults.length === 0) {
    return "test.evalResults must be a non-empty array.";
  }

  return "";
}

async function handleSubmit(request, env) {
  const corsOrigin = resolveCorsOrigin(request, env);
  if (corsOrigin === null) {
    return errorResponse("Origin is not allowed.", 403, request, env);
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return errorResponse("Request body must be valid JSON.", 400, request, env);
  }

  const validationError = validateSubmission(payload);
  if (validationError) {
    return errorResponse(validationError, 400, request, env);
  }

  const payloadJson = JSON.stringify(payload);
  if (payloadJson.length > 256 * 1024) {
    return errorResponse("Payload is too large.", 413, request, env);
  }

  const createdAt = new Date().toISOString();
  const username = sanitizeString(payload.participant.userName, 128);
  const email = sanitizeString(payload.participant.userEmail, 255);
  const comment = sanitizeString(payload.participant.userComment, 4000);
  const testName = sanitizeString(payload.test.name, 255);
  const testMode = sanitizeString(payload.test.mode, 32);
  const pagePath = getPagePath(payload);
  const origin = request.headers.get("Origin") || "";
  const userAgent = sanitizeString(
    request.headers.get("User-Agent") || payload?.client?.userAgent || "",
    1024,
  );
  const resultCount = getEvalResults(payload).length;

  let clientIpHash = "";
  const clientIp = request.headers.get("CF-Connecting-IP");
  if (clientIp && env.IP_HASH_SALT) {
    clientIpHash = await sha256Hex(`${env.IP_HASH_SALT}:${clientIp}`);
  }

  const submissionId = crypto.randomUUID();

  await env.RESULTS_DB.prepare(
    `INSERT INTO submissions (
      id,
      created_at,
      test_name,
      test_mode,
      page_path,
      origin,
      username,
      email,
      comment,
      client_ip_hash,
      user_agent,
      result_count,
      payload_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      submissionId,
      createdAt,
      testName,
      testMode,
      pagePath,
      origin,
      username,
      email,
      comment,
      clientIpHash,
      userAgent,
      resultCount,
      payloadJson,
    )
    .run();

  return jsonResponse(
    {
      success: true,
      id: submissionId,
      createdAt,
      message: "Submission stored successfully.",
    },
    { status: 201 },
    request,
    env,
  );
}

async function handleExport(request, env) {
  if (!env.ADMIN_TOKEN) {
    return errorResponse(
      "ADMIN_TOKEN is not configured for this worker.",
      501,
      request,
      env,
    );
  }

  if (getAdminToken(request) !== env.ADMIN_TOKEN) {
    return errorResponse("Unauthorized.", 401, request, env);
  }

  const url = new URL(request.url);
  const requestedLimit = Number.parseInt(url.searchParams.get("limit") || "100", 10);
  const limit = Number.isNaN(requestedLimit)
    ? 100
    : Math.min(Math.max(requestedLimit, 1), 1000);

  const { results } = await env.RESULTS_DB.prepare(
    `SELECT
      id,
      created_at,
      test_name,
      test_mode,
      page_path,
      origin,
      username,
      email,
      comment,
      client_ip_hash,
      user_agent,
      result_count,
      payload_json
    FROM submissions
    ORDER BY created_at DESC
    LIMIT ?`,
  )
    .bind(limit)
    .all();

  return jsonResponse(
    {
      success: true,
      count: results.length,
      results,
    },
    { status: 200 },
    request,
    env,
  );
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      const corsOrigin = resolveCorsOrigin(request, env);
      if (corsOrigin === null) {
        return errorResponse("Origin is not allowed.", 403, request, env);
      }

      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(request, env),
      });
    }

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse(
        {
          success: true,
          service: "mos-results-api",
        },
        { status: 200 },
        request,
        env,
      );
    }

    if (request.method === "POST" && url.pathname === "/api/submissions") {
      return handleSubmit(request, env);
    }

    if (request.method === "GET" && url.pathname === "/api/submissions/export") {
      return handleExport(request, env);
    }

    return errorResponse("Not found.", 404, request, env);
  },
};
