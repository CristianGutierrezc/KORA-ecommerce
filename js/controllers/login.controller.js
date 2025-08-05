
import { setCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    const usuariosMock = [
      {
        nombre: 'Administrador',
        email: 'cristianguti.93@gmail.com',
        password: '1234',
        rol: 'admin'
      },
      {
        nombre: 'Usuario Regular',
        email: 'usuario@kora.com',
        password: 'demo123',
        rol: 'usuario'
      }
    ];

    const usuario = usuariosMock.find(
      u => u.email === email && u.password === password
    );

    if (usuario) {
      setCookie('sesionKora', JSON.stringify(usuario), 1);
      alert(`Bienvenido, ${usuario.nombre}`);
      
      if (usuario.rol === 'admin') {
        window.location.href = '../pages/dashboard.html';
      } else {
        window.location.href = '../index.html';
      }

    } else {
      alert('Credenciales incorrectas o no autorizadas.');
    }
  });
});
