/**
 * Получает значение куки по ее имени.
 * @param cookieName - Имя куки (например, "accessToken").
 * @returns Значение куки или null, если куки не найдена.
 */
export const getCookie = (cookieName: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const name = `${cookieName}=`;
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }

  return null;
};
