import { cookies } from "next/headers";

export async function setServerToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  console.log("✅ [setServerToken] token cookie set"); //
}

export async function getServerToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const value = cookieStore.get("token")?.value;
  console.log("🔎 [getServerToken] token from cookies():", value); // 👈 add this
  return value;
}
