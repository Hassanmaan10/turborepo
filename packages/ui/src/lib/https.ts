const BASE = "https://fitupapi-942q.onrender.com";

export async function post(path: string, body: unknown) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return { ok: true as const, data, status: res.status };
    }

    return {
      ok: false as const,
      error: (data as any)?.message || "Request failed.",
      status: res.status,
    };
  } catch {
    return {
      ok: false as const,
      error: "Network error. Try again.",
      status: 0,
    };
  }
}
