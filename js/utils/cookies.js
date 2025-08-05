
export function setCookie(nombre, valor, dias = 1) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  const expires = "expires=" + fecha.toUTCString();
  document.cookie = `${nombre}=${valor};${expires};path=/`;
}

export function getCookie(nombre) {
  const nameEQ = nombre + "=";
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function borrarCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
