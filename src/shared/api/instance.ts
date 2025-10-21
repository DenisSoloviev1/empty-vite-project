import axios, { AxiosRequestConfig, Method } from 'axios';
import { getCookie } from '../utils/cookie';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * Parameters for API instance request
 * @interface Params
 * @template T - Expected response data type
 */
interface Params {
  /** HTTP method (GET, POST, PUT, DELETE, etc.) */
  method?: Method;
  /** API endpoint path (will be appended to base URL) */
  path: string;
  /** Request body for POST, PUT, PATCH requests */
  body?: object;
  /** AbortSignal for request cancellation */
  signal?: AbortSignal;
  /** Additional HTTP headers */
  headers?: Record<string, string>;
}

/**
 * Standard error response structure from API
 * @interface ResponseError
 */
interface ResponseError {
  /** Error status from server */
  status?: 'error' | unknown;
  /** Human-readable error message */
  message?: string;
  /** Error code from server */
  code?: number;
}

/**
 * Universal HTTP client for API communication using Axios
 * Handles authentication, error processing, and request configuration
 *
 * @template T - Expected response data type
 * @param {Params} params - Request configuration parameters
 * @param {Method} [params.method='GET'] - HTTP method
 * @param {string} params.path - API endpoint path
 * @param {object} [params.body] - Request payload
 * @param {AbortSignal} [params.signal] - Abort signal for request cancellation
 * @param {Record<string, string>} [params.headers] - Additional headers
 *
 * @returns {Promise<T>} Parsed response data from API
 *
 * @throws {Error} Will throw an error for:
 * - Network errors
 * - HTTP errors (4xx, 5xx status codes)
 * - Business logic errors from backend
 * - Unknown errors with descriptive messages
 */
export const apiInstance = async <T>({
  method = 'GET',
  path,
  body,
  signal,
  headers,
}: Params): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url: `${API_BASE_URL}/${path}`,
    data: body,
    signal,
    headers: {
      Authorization: `Bearer ${getCookie('accessToken') || ''}`,
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Handle Axios-specific errors
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as ResponseError | undefined;

      // Server returned error with message field
      if (serverError?.message) {
        throw new Error(serverError.message);
      }

      // Server returned error with code
      if (serverError?.code) {
        throw new Error(`Ошибка ${serverError.code}: ${error.message}`);
      }

      // Generic error message if no specific data available
      throw new Error(
        error.response?.statusText ||
          error.message ||
          'Произошла ошибка при запросе к серверу'
      );
    }

    // Handle non-Axios errors (network issues, etc.)
    throw new Error(
      'Неизвестная ошибка: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
};
