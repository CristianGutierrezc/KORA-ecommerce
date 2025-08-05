// js/models/usuario.model.js

const CLAVE_USUARIOS = 'usuariosKora';

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

export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
}

export function cargarUsuariosMock() {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(mockUsuarios));
}

/**
 * Agrega un nuevo usuario.
 * @param {Object} usuario
 */
export function agregarUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

/**
 * Verifica si las credenciales coinciden con un usuario registrado.
 * @param {string} email
 * @param {string} password
 * @returns {Object|null}
 */
export function loginUsuario(email, password) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.email === email && u.password === password) || null;
}
