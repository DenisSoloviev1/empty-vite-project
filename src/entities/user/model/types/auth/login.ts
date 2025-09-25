import { User } from "../user.interface";

export interface LoginParams {
  login: string;
  password: string;
}

export interface LoginResponse extends User {}
