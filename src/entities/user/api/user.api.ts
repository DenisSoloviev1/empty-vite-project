import { AuthApi } from "./auth";

class UserApi {
  private static instance: UserApi;
  readonly baseKey = "user";

  public static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }

    return UserApi.instance;
  }

  auth: AuthApi;

  constructor() {
    this.auth = AuthApi.getInstance(this.baseKey);
  }
}

export const userApi = UserApi.getInstance();
