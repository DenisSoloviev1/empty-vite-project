import axios, { AxiosRequestConfig, Method } from "axios";
import { getCookie } from "../utils/cookie";

interface Params {
  method?: Method;
  path: string;
  body?: object;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

interface ResponseError {
  status?: "error" | unknown;
  message?: string;
  code?: number;
}

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * Универсальный HTTP-клиент для работы с API на Axios.
 * @throws {Error} — при сетевой ошибке, HTTP-ошибке или бизнес-ошибке от бэкенда.
 * @returns {Promise<T>} — данные успешного ответа.
 */
export const apiInstance = async <T>({
  method = "GET",
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
      Authorization: `Bearer ${getCookie("accessToken") || ""}`, //
      "Content-Type": "application/json",
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as ResponseError | undefined;

      // Если сервер вернул ошибку с полем message, используем его
      if (serverError?.message) {
        throw new Error(serverError.message);
      }

      // Если есть код ошибки, добавляем его в сообщение
      if (serverError?.code) {
        throw new Error(`Ошибка ${serverError.code}: ${error.message}`);
      }

      // Общее сообщение об ошибке, если нет специфичных данных
      throw new Error(
        error.response?.statusText ||
          error.message ||
          "Произошла ошибка при запросе к серверу",
      );
    }

    // Для не-Axios ошибок (например, проблемы с сетью)
    throw new Error(
      "Неизвестная ошибка: " +
        (error instanceof Error ? error.message : String(error)),
    );
  }
};
