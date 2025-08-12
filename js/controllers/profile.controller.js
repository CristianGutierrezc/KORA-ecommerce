// js/controllers/profile.controller.js
import { getCookie, setCookie } from '../utils/cookies.js';
import { validarEmail, validarPassword } from '../utils/validaciones.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-perfil');

  // Cargar sesión desde cookie
  const sesion = getCookie('usuario');
  const user = sesion ? JSON.parse(sesion) : null;

  // Precargar valores si hay usuario
  if (user) {
    document.getElementById('nombre').value = user.nombre;
    document.getElementById('email').value = user.email;
  }

  // Evento de envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturar nuevos datos
    const nuevoNombre = document.getElementById('nombre').value.trim();
    const nuevoEmail = document.getElementById('email').value.trim().toLowerCase();
    const nuevaPassword = document.getElementById('password').value.trim();

    // Validaciones básicas
    if (!nuevoNombre) {
      alert('El nombre no puede estar vacío.');
      return;
    }

    if (!validarEmail(nuevoEmail)) {
      alert('Introduce un correo válido.');
      return;
    }

    if (!validarPassword(nuevaPassword)) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // Crear nuevo objeto actualizado
    const usuarioActualizado = {
      ...user,
      nombre: nuevoNombre,
      email: nuevoEmail,
      password: nuevaPassword
    };

    // Guardar en cookie actualizada
    setCookie('usuario', JSON.stringify(usuarioActualizado));
    alert('Perfil actualizado correctamente.');
    window.location.href = '../index.html';
  });
});
