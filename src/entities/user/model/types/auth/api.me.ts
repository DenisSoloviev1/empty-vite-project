import { User } from "../user.interface";

export type AuthMeParams = {
  signal: AbortSignal;
};

// export type AuthMeResponse = {
//   user: User;
// };

export type AuthMeResponse = User;
