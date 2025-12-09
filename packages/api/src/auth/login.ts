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

    const { status, message, token } = validateLoginResult(res.data);

    await setServerToken(token);

    return {
      status,
      token,
      message: message ?? "Logged in succesfully",
    };
  } catch (error) {
    const message =
      (error as Error).message || "Something went wrong. Please try again.";

    return {
      status: false,
      token: null,
      message,
    };
  }
}
