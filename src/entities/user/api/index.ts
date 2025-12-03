import { httpInstance } from '@/shared/api/http';

import { UserMeParams, UserMeResponse } from '../model/types';

/**
 * Userentication API service class for handling user authentication operations
 * Implements Singleton pattern to ensure single instance across the application
 */
export class UserApi {
  private static instance: UserApi;
  readonly baseKey = 'user';

  /**
   * Gets the singleton instance of UserApi
   * @returns {UserApi} Singleton instance of UserApi
   */
  public static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }

    return UserApi.instance;
  }

  /**
   * Retrieves current authenticated user's account data
   * Validates current session and returns user profile information
   *
   * @param {AbortSignal} signal - Optional abort signal for request cancellation
   * @returns {UserMeResponse} Current user account data
   */
  me = ({ signal }: UserMeParams) => {
    return httpInstance<UserMeResponse>({
      path: `${this.baseKey}/me`,
      signal,
    });
  };
}

export const userApi = UserApi.getInstance();
