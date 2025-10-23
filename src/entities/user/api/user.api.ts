import { AuthApi } from './auth';

/**
 * Main User API service class that aggregates various user-related API modules
 * Implements Singleton pattern to provide unified access to user operations
 * Serves as a facade for organizing related API functionality
 */
class UserApi {
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

  auth: AuthApi;

  /**
   * Private constructor for Singleton pattern
   * Initializes all API modules with proper configuration
   */
  private constructor() {
    this.auth = AuthApi.getInstance(this.baseKey);
  }
}

/**
 * Singleton instance of UserApi
 * Provides global access to user-related API functionality throughout the application
 */
export const userApi = UserApi.getInstance();
