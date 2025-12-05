"use server";

import {
  AuthResult,
  type Login,
  validateLogin,
} from "@workspace/interfaces/auth";

import { post } from "../https";
import { setServerToken } from "../token-server";

export async function Login(payload: Login): Promise<AuthResult> {
  try {
    // 1️⃣ Validate the incoming login data with Zod
    const parsed = validateLogin(payload);

    if (!parsed.success) {
      const firstError =
        parsed.error.errors[0]?.message ?? "Invalid email or password.";

      throw new Error(firstError);
    }

    // 2️⃣ Use the safe, parsed data to call the backend
    const res = await post("/api/auth/login", parsed.data);

    if (!res.ok) {
      throw new Error(res.error ?? "Invalid Credentials. Please try again.");
    }

    // 3️⃣ Handle backend response (no extra Zod here)
    const data = res.data as {
      status: boolean;
      message?: string;
      token?: string;
    };

    if (!data?.status || !data.token) {
      throw new Error(data?.message ?? "Invalid credentials. Please try again");
    }

    // 4️⃣ Set token cookie on server
    await setServerToken(data.token);

    // 5️⃣ Return normalized AuthResult for the client
    return {
      ok: true,
      token: data.token,
      message: data.message ?? "Logged in succesfully",
    };
  } catch (error) {
    let message = "Something went wrong. Please try again.";

    if (error instanceof Error && error.message) {
      message = error.message;
    }

    return {
      ok: false,
      token: null,
      message,
    };
  }
}
