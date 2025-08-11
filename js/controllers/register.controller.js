
import { agregarUsuario, obtenerUsuarios } from '../models/usuario.model.js';
import { validarEmail, validarPassword } from '../utils/validaciones.js';
import { setCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-register');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('emailRegistro').value.trim().toLowerCase();
    const password = document.getElementById('passwordRegistro').value.trim();

    // Validaciones visuales
    if (nombre.length < 2) {
      alert('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    if (!validarEmail(email)) {
      alert('Introduce un correo electrónico válido.');
      return;
    }

    if (!validarPassword(password)) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // Comprobar si el usuario ya existe
    const usuarios = obtenerUsuarios();
    const existente = usuarios.find(u => u.email === email);

    if (existente) {
      alert('Ese correo ya está registrado.');
      return;
    }

    // Rol: admin solo si el correo y contraseña coinciden
    const rol = (email === 'admin@kora.com' && password === '1234') ? 'admin' : 'user';

    // Crear y guardar el nuevo usuario
    const nuevoUsuario = { nombre, email, password, rol };
    agregarUsuario(nuevoUsuario);

    // Guardar sesión en cookie
    setCookie('usuario', JSON.stringify(nuevoUsuario), 1);

    alert(`Bienvenido, ${nombre}`);
    const destino = rol === 'admin' ? 'dashboard.html' : '../index.html';
    window.location.href = destino;
  });
});
