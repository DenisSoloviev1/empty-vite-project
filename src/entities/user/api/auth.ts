import { apiInstance } from '@/shared/api/instance';

import {
  AuthLoginParams,
  AuthLoginResponse,
  AuthLogoutParams,
  AuthLogoutResponse,
  AuthMeParams,
  AuthMeResponse,
} from '../model/types';

/**
 * Authentication API service class for handling user authentication operations
 * Implements Singleton pattern to ensure single instance across the application
 */
export class AuthApi {
  private static instance: AuthApi;
  readonly baseKey: string;

  /**
   * Private constructor for Singleton pattern
   * @param prefixKey - API prefix key for base URL construction
   */
  private constructor(private readonly prefixKey: string) {
    this.baseKey = `${this.prefixKey}/auth`;
  }

  /**
   * Gets the singleton instance of AuthApi
   * @param prefixKey - API prefix key for base URL construction
   * @returns {AuthApi} Singleton instance of AuthApi
   */
  public static getInstance(prefixKey: string): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi(prefixKey);
    }

    return AuthApi.instance;
  }

  /**
   * Authenticates user account in the system
   * Performs login with username/email and password credentials
   *
   * @param {AuthLoginParams} params - Login parameters
   * @param {string} params.login - User login (email or username)
   * @param {string} params.password - User password
   * @param {AbortSignal} [params.signal] - Optional abort signal for request cancellation
   * @returns {Promise<AuthLoginResponse>} Authentication token and user account data
   */
  login = ({ login, password, signal }: AuthLoginParams) => {
    return apiInstance<AuthLoginResponse>({
      method: 'POST',
      path: `${this.baseKey}/login`,
      // body: { login, password }, // Alternative format if needed
      body: {
        username: login,
        password,
      },
      signal,
    });
  };

  /**
   * Logs out the current user from the system
   * Invalidates the current session or authentication token
   *
   * @param {AuthLogoutParams} params - Logout parameters
   * @param {AbortSignal} [params.signal] - Optional abort signal for request cancellation
   * @returns {Promise<AuthLogoutResponse>} Logout success status
   */
  logout = ({ signal }: AuthLogoutParams) => {
    return apiInstance<AuthLogoutResponse>({
      path: `${this.baseKey}/logout`,
      signal,
    });
  };

  /**
   * Retrieves current authenticated user's account data
   * Validates current session and returns user profile information
   *
   * @param {AuthMeParams} params - Me parameters
   * @param {AbortSignal} [params.signal] - Optional abort signal for request cancellation
   * @returns {Promise<AuthMeResponse>} Current user account data
   */
  me = ({ signal }: AuthMeParams) => {
    return apiInstance<AuthMeResponse>({
      path: `${this.baseKey}/me`,
      signal,
    });
  };
}
