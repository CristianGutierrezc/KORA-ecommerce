
import { getCookie, borrarCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  // Elementos del menú principal
  const usuarioNombre = document.getElementById('usuario-nombre');
  const loginLink = document.getElementById('login-link');
  const cerrarSesion = document.getElementById('cerrar-sesion');
  const adminLink = document.getElementById('admin-link');
  const perfilLink = document.getElementById('perfil-link');

  // Elementos del menú móvil
  const loginLinkMobile = document.getElementById('login-link-mobile');
  const cerrarSesionMobile = document.getElementById('cerrar-sesion-mobile');
  const adminLinkMobile = document.getElementById('admin-link-mobile');
  const perfilLinkMobile = document.getElementById('perfil-link-mobile');

  // Leer la cookie de sesión
  const sesion = getCookie('sesionKora');
  if (sesion) {
    const usuario = JSON.parse(sesion);

    // Mostrar nombre de usuario en barra
    if (usuarioNombre) usuarioNombre.textContent = usuario.nombre;

    // Ocultar login y mostrar cerrar sesión (versión escritorio)
    if (loginLink) loginLink.style.display = 'none';
    if (cerrarSesion) cerrarSesion.style.display = 'inline-block';
    if (usuario.rol === 'admin' && adminLink) adminLink.style.display = 'inline-block';
    if (perfilLink) perfilLink.style.display = 'inline-block';

    // Ocultar login y mostrar cerrar sesión (versión móvil)
    if (loginLinkMobile) loginLinkMobile.style.display = 'none';
    if (cerrarSesionMobile) cerrarSesionMobile.style.display = 'block';
    if (usuario.rol === 'admin' && adminLinkMobile) adminLinkMobile.style.display = 'block';
    if (perfilLinkMobile) perfilLinkMobile.style.display = 'block';
  }

  // Función de cerrar sesión (ambas versiones)
  const cerrarSesionGlobal = () => {
    borrarCookie('sesionKora');
    window.location.href = 'form-login.html'; // redirige siempre al login
  };

  if (cerrarSesion) cerrarSesion.addEventListener('click', cerrarSesionGlobal);
  if (cerrarSesionMobile) cerrarSesionMobile.addEventListener('click', cerrarSesionGlobal);
});
