
import { validarCredenciales } from '../models/usuario.model.js';
import { setCookie } from '../utils/cookies.js';
import { validarEmail, validarPassword } from '../utils/validaciones.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    // Validación visual
    if (!validarEmail(email)) {
      alert('Introduce un correo electrónico válido.');
      emailInput.focus();
      return;
    }

    if (!validarPassword(password)) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      passwordInput.focus();
      return;
    }

    // Validación con mock de usuarios
    const usuario = validarCredenciales(email, password);

    if (!usuario) {
      alert('Credenciales incorrectas o no autorizadas.');
      return;
    }

    // Guardar sesión correctamente
    setCookie('usuario', JSON.stringify(usuario), 1); // Nombre debe ser 'usuario'

    alert(`Bienvenido, ${usuario.nombre}`);

    // Redirección según rol
    const destino = usuario.rol === 'admin' ? 'dashboard.html' : '../index.html';
    window.location.href = destino;
  });
});
