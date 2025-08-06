// js/controllers/sesion.controller.js
import { getCookie, borrarCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(getCookie('usuario') || 'null');
  const nombreSpan = document.getElementById('usuario-nombre');
  const loginLink = document.getElementById('login-link');
  const cerrarSesionBtn = document.getElementById('cerrar-sesion');
  const adminLink = document.getElementById('admin-link');
  const perfilLink = document.getElementById('perfil-link');

  const cerrarSesionMobile = document.getElementById('cerrar-sesion-mobile');
  const loginLinkMobile = document.getElementById('login-link-mobile');
  const adminLinkMobile = document.getElementById('admin-link-mobile');
  const perfilLinkMobile = document.getElementById('perfil-link-mobile');

  if (usuario) {
    nombreSpan.textContent = usuario.nombre;
    loginLink.style.display = 'none';
    cerrarSesionBtn.style.display = 'inline-block';
    perfilLink.style.display = 'inline-block';
    loginLinkMobile.style.display = 'none';
    cerrarSesionMobile.style.display = 'block';
    perfilLinkMobile.style.display = 'block';

    if (usuario.rol === 'admin') {
      adminLink.style.display = 'inline-block';
      adminLinkMobile.style.display = 'block';
    }
  }

  // Cerrar sesión (desktop y móvil)
  [cerrarSesionBtn, cerrarSesionMobile].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        borrarCookie('usuario');
        window.location.href = 'index.html';
      });
    }
  });
});
