// js/models/usuario.model.js
const mockUsuarios = [
  {
    nombre: 'Admin',
    email: 'cristianguti.93@gmail.com',
    password: '1234',
    rol: 'admin'
  },
  {
    nombre: 'Usuario',
    email: 'usuario@demo.com',
    password: 'demo123',
    rol: 'usuario'
  }
];

/**
 * Verifica si el email y contraseña coinciden con algún usuario mock
 * @param {string} email
 * @param {string} password
 * @returns {Object|null}
 */
export function validarCredenciales(email, password) {
  return mockUsuarios.find(u => u.email === email && u.password === password) || null;
}
