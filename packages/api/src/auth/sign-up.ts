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

    const { status, message, token } = validateSignUpResult(res.data);

    return {
      status,
      token,
      message: message ?? "User Created succesfully",
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
