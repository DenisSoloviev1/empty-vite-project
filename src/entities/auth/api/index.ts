import { httpInstance } from '@shared/api/http';

import {
  AuthLoginParams,
  AuthLoginResponse,
  AuthLogoutResponse,
} from '../model/types';

/** Класс для работы с авторизацией */
export class AuthApi {
  private static instance: AuthApi;
  readonly baseKey = 'auth';

  static getInstance(): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi();
    }

    return AuthApi.instance;
  }

  /**
   * Авторизация в системе
   * @param {string} login - Логин
   * @param {string} password - Пароль
   * @returns {AuthLoginResponse} Токен аутентификации и идентификатор
   */
  login = ({ login, password }: AuthLoginParams) => {
    return httpInstance<AuthLoginResponse>({
      method: 'POST',
      path: `${this.baseKey}/login`,
      body: { login, password },
    });
  };

  /**
   * Выход из системы
   * @returns {AuthLogoutResponse} Статус успешного выхода
   */
  logout = () => {
    return httpInstance<AuthLogoutResponse>({
      method: 'POST',
      path: `${this.baseKey}/logout`,
    });
  };
}

export const authApi = AuthApi.getInstance();
