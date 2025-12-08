"use server";

import {
  AuthResult,
  ISignUp,
  validateSignUpResult,
} from "@workspace/interfaces/auth";
import { post } from "../https";

export async function SignUp(payload: ISignUp): Promise<AuthResult> {
  try {
    const res = await post("/api/auth/signup", payload);
    if (!res.ok) {
      throw new Error(res.error ?? "Invalid Credentials. Please try again.");
    }

    const { status, message, token } = validateSignUpResult(res.data);

    if (!status) {
      throw new Error(message ?? "Failed to sign up. Please try again.");
    }
    return {
      ok: true,
      token,
      message: message ?? "User Created succesfully",
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
