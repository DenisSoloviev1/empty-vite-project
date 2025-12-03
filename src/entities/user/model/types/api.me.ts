import { User } from './user.interface';

export type UserMeParams = {
  signal: AbortSignal;
};

export type UserMeResponse = User;
