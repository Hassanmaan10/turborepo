const BASE = "https://fitupapi-942q.onrender.com";

export async function request(method: string, path: string, body?: unknown) {
  try {
    const init: RequestInit = { method };

    if (body !== undefined && method !== "GET" && method !== "HEAD") {
      init.headers = { "Content-Type": "application/json" };
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
        error: (data as any)?.message || `Request failed (${res.status})`,
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

// Simple wrappers (so you can just call get/post/patch…)
export const get = (path: string) => request("GET", path);
export const post = (path: string, body?: unknown) =>
  request("POST", path, body);
export const patch = (path: string, body?: unknown) =>
  request("PATCH", path, body);
export const put = (path: string, body?: unknown) => request("PUT", path, body);
export const del = (path: string, body?: unknown) =>
  request("DELETE", path, body);

// tiny helper
function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
