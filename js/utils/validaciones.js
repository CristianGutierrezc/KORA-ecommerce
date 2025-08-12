/**
 * Funciones de validación de formularios.
 *
 * Nota: la lógica de renderizado de productos ahora vive en
 * `js/controllers/home.controller.js` y el modo oscuro en
 * `js/utils/darkmode.js`.
 */
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarPassword(password) {
  return typeof password === 'string' && password.length >= 4;
}
