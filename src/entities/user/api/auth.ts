import { apiInstance } from "@/shared/api/instance";

import {
  AuthLoginParams,
  AuthLoginResponse,
  AuthLogoutParams,
  AuthLogoutResponse,
  AuthMeParams,
  AuthMeResponse,
} from "../model/types";

/** Класс аутентификации в системе */
export class AuthApi {
  private static instance: AuthApi;
  readonly baseKey: string;

  private constructor(private readonly prefixKey: string) {
    this.baseKey = `${this.prefixKey}/auth`; // может поменяться путь
  }

  public static getInstance(prefixKey: string): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi(prefixKey);
    }

    return AuthApi.instance;
  }

  /**
   * Авторизация аккаунта в системе
   * @param login логин (почта) для авторизации аккаунта
   * @param password пароль аккаунта для авторизации
   * @returns  token и Account
   */
  login = ({ login, password, signal }: AuthLoginParams) => {
    return apiInstance<AuthLoginResponse>({
      method: "POST",
      path: `${this.baseKey}/login`,
      // body: { login, password },
      body: {
        username: login,
        password,
      },
      signal,
    });
  };

  /**
   * Выход из аккаунта
   * @returns success
   */
  logout = ({ signal }: AuthLogoutParams) => {
    return apiInstance<AuthLogoutResponse>({
      path: `${this.baseKey}/logout`,
      signal,
    });
  };

  /**
   * Получение данных об аккаунте
   * @returns account
   */
  me = ({ signal }: AuthMeParams) => {
    return apiInstance<AuthMeResponse>({
      path: `${this.baseKey}/me`,
      signal,
    });
  };
}
