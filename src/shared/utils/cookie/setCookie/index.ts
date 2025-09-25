/**
 * * Устанавливает куки.
 * @param cookieName - Название куки.
 * @param cookieValue - Записываемое значение куки.
 * @param expiresDays - Срок действия в днях (по умолчанию 1).
 */
export const setCookie = (
  cookieName: string,
  cookieValue: string,
  expiresDays = 1,
) => {
  const d = new Date();

  d.setTime(d.getTime() + expiresDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();

  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};
