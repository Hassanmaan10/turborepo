export enum Goal {
  LOSE_WEIGHT = "Lose Weight",
  GAIN_WEIGHT = "Gain Weight",
  MAINTAIN_WEIGHT = "Maintain Weight",
}

export interface Login {
  email: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  weight: number;
  goal: Goal;
  age: number;
}

export interface AuthResult {
  status: boolean;
  token: string | null;
  message: string;
}

export interface AuthResponseData {
  status: boolean;
  message: string;
  token: string;
}
