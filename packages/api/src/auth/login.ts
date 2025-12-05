"use server";

import {
  AuthResult,
  type Login,
  validateLoginResult,
} from "@workspace/interfaces/auth";

import { post } from "../https";
import { setServerToken } from "../token-server";

export async function Login(payload: Login): Promise<AuthResult> {
  try {
    const res = await post("/api/auth/login", payload);

    if (!res.ok) {
      throw new Error(res.error ?? "Invalid Credentials. Please try again.");
    }

    const data = validateLoginResult(res.data);

    if (!data.status) {
      throw new Error(data.message ?? "Invalid credentials. Please try again");
    }

    await setServerToken(data.token);

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
