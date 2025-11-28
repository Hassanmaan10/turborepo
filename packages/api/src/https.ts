const BASE = "https://fitupapi-942q.onrender.com";

type RequestOptions = {
  token?: string;
};

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export async function request(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {}
) {
  try {
    const init: RequestInit = { method, headers: {} };

    // auth header if token provided
    if (options.token) {
      (init.headers as Record<string, string>).authorization =
        `Bearer ${options.token}`;
    }

    // body + content-type for non-GET/HEAD
    if (body !== undefined && method !== "GET" && method !== "HEAD") {
      (init.headers as Record<string, string>)["Content-Type"] =
        "application/json";
      init.body = JSON.stringify(body);
    }

    const res = await fetch(`${BASE}${path}`, init);

    const text = await res.text();
    const data = text ? safeJson(text) : null;

    if (res.ok) {
      return { ok: true as const, data, status: res.status };
    } else {
      return {
        ok: false as const,
        data, // 👈 include parsed data (may be null if not JSON)
        error:
          (data as any)?.message ||
          (data as any)?.error ||
          text || // fallback to raw text if no JSON message
          `Request failed (${res.status})`,
        status: res.status,
      };
    }
  } catch {
    return {
      ok: false as const,
      error: "Network error. Try again.",
      status: 0,
    };
  }
}

// Simple wrappers
export const get = (path: string, options?: RequestOptions) =>
  request("GET", path, undefined, options);

export const post = (path: string, body?: unknown, options?: RequestOptions) =>
  request("POST", path, body, options);

export const patch = (path: string, body?: unknown, options?: RequestOptions) =>
  request("PATCH", path, body, options);

export const put = (path: string, body?: unknown, options?: RequestOptions) =>
  request("PUT", path, body, options);

export const del = (path: string, body?: unknown, options?: RequestOptions) =>
  request("DELETE", path, body, options);
