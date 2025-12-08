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
    const res = await post("/api/auth/login", payload);

    if (!res.ok) {
      throw new Error(res.error ?? "Invalid Credentials. Please try again.");
    }

    const { status, message, token } = validateLogin(res.data);

    if (!status) {
      throw new Error(message ?? "Invalid credentials. Please try again");
    }

    await setServerToken(token);

    return {
      ok: status,
      token: token,
      message: message ?? "Logged in succesfully",
    };
  } catch (error) {
    const message =
      (error as Error).message || "Something went wrong. Please try again.";

    return {
      ok: false,
      token: null,
      message,
    };
  }
}
