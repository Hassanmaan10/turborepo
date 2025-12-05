"use server";

import { AuthResult, ISignUp } from "@workspace/interfaces/auth";
import { post } from "../https";

export async function SignUp(payload: ISignUp): Promise<AuthResult> {
  try {
    const res = await post("/api/auth/signup", payload);
    if (!res.ok) {
      return {
        ok: false,
        token: null,
        message: res.error ?? "Falied to sign up. Please try again.",
      };
    }
    const data = res.data as {
      status: boolean;
      message: string;
      token?: string;
    };
    if (!data.status || !data.token) {
      return {
        ok: false,
        token: null,
        message: data.message ?? "Failed to sign up. Please try again.",
      };
    }
    return {
      ok: true,
      token: data.token,
      message: data.message ?? "User Created succesfully",
    };
  } catch (error) {
    return {
      ok: false,
      token: null,
      message: "Something went wrong. Please try again.",
    };
  }
}
