//set token cookie for 7 days
export function setTokenCookie(token: string) {
  if (typeof document === "undefined") return;
  document.cookie = [
    `token=${encodeURIComponent(token)}`, // make it safe to store
    "path=/",
    `max-age=${60 * 60 * 24 * 7}`,
    "samesite=lax",
  ].join("; ");
}

export function getTokenCookie(): string | null {
  if (typeof document === "undefined") return null;

  const entry = document.cookie.split(";").find((c) => c.startsWith("token="));
  if (!entry) return null;

  const [, raw] = entry.split("=", 2);
  return raw ? decodeURIComponent(raw) : null;
}
