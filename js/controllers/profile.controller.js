// js/controllers/profile.controller.js
import { getCookie, setCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  const cookie = getCookie('sesionKora');
  const usuario = cookie ? JSON.parse(cookie) : null;

  if (!usuario) {
    alert('Debes iniciar sesión primero.');
    window.location.href = '../pages/form-login.html';
    return;
  }

  // Cargar datos actuales
  document.getElementById('nombre').value = usuario.nombre || '';
  document.getElementById('email').value = usuario.email || '';
  document.getElementById('password').value = '';

  // Guardar cambios
  const form = document.getElementById('form-perfil');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      ...usuario,
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value.trim()
    };

    setCookie('sesionKora', JSON.stringify(nuevoUsuario), 1);
    alert('Perfil actualizado correctamente.');
  });
});
