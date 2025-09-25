import { apiInstance } from "@/shared/api/instance";
import { LoginParams, User } from "../model/types";

/** Класс аутентификации в системе */
class AuthApi {
  private static instance: AuthApi;
  private baseKey: string;

  private constructor(private readonly prefixKey: string) {
    this.baseKey = `${this.prefixKey}`;
  }

  public static getInstance(): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi("auth"); // может поменяться
    }

    return AuthApi.instance;
  }

  /**
   * Авторизация аккаунта в системе
   * @param login логин (почта) для авторизации аккаунта
   * @param password пароль аккаунта для авторизации
   * @returns  token и Account
   */
  login = async ({ login, password }: LoginParams) => {
    const response = await apiInstance<User>({
      method: "POST",
      path: `${this.baseKey}/login`,
      // body: { login, password },
      body: {
        username: login,
        password,
      },
    });

    return response;
  };

  /**
   * Выход из аккаунта
   * @returns success
   */
  logout = async () => {
    const response = await apiInstance<{ success: boolean }>({
      path: `${this.baseKey}/logout`,
    });

    return response;
  };

  /**
   * Получение данных об аккаунте
   * @returns account
   */
  me = () => {
    const response = apiInstance<User>({
      path: `${this.baseKey}/me`,
    });

    return response;
  };
}

export const authApi = AuthApi.getInstance();
