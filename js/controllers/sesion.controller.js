import { getCookie, borrarCookie } from '../utils/cookies.js';

const nombreUsuario = document.getElementById('usuario-nombre');
const loginLink = document.getElementById('login-link');
const loginLinkMobile = document.getElementById('login-link-mobile');
const cerrarSesion = document.getElementById('cerrar-sesion');
const cerrarSesionMobile = document.getElementById('cerrar-sesion-mobile');
const adminLink = document.getElementById('admin-link');
const adminLinkMobile = document.getElementById('admin-link-mobile');
const perfilLink = document.getElementById('perfil-link');
const perfilLinkMobile = document.getElementById('perfil-link-mobile');

// Leer cookie de sesión
const usuario = getCookie('usuario');

if (usuario) {
  const datos = JSON.parse(usuario);
  if (nombreUsuario) nombreUsuario.textContent = datos.nombre;

  if (loginLink) loginLink.style.display = 'none';
  if (loginLinkMobile) loginLinkMobile.style.display = 'none';
  if (cerrarSesion) cerrarSesion.style.display = 'inline';
  if (cerrarSesionMobile) cerrarSesionMobile.style.display = 'inline';

  if (datos.rol === 'admin') {
    if (adminLink) adminLink.style.display = 'inline';
    if (adminLinkMobile) adminLinkMobile.style.display = 'inline';
  } else {
    if (perfilLink) perfilLink.style.display = 'inline';
    if (perfilLinkMobile) perfilLinkMobile.style.display = 'inline';
  }
}

// Redirección manual del botón login
if (loginLink) {
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'pages/form-login.html';
  });
}

if (loginLinkMobile) {
  loginLinkMobile.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'pages/form-login.html';
  });
}

// Botón cerrar sesión
function cerrarSesionUsuario() {
  borrarCookie('usuario');
  window.location.reload();
}

if (cerrarSesion) {
  cerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarSesionUsuario();
  });
}

if (cerrarSesionMobile) {
  cerrarSesionMobile.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarSesionUsuario();
  });
}
