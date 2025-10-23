import { User } from "../user.interface";

export type AuthLoginParams = {
  login: string;
  password: string;
  signal?: AbortSignal
};

// export type AuthLoginResponse = {
//   user: User;
// };

export type AuthLoginResponse = User;
