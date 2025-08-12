// js/models/usuario.model.js

const CLAVE_USUARIOS = 'usuariosKora'; // Clave centralizada para mayor control

// Agrega un nuevo usuario al localStorage
export function agregarUsuario(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
  usuarios.push(usuario);
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

// Devuelve un usuario si el email y la contraseña coinciden
export function loginUsuario(email, password) {
  const usuarios = JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
  return usuarios.find(u => u.email === email && u.password === password) || null;
}

// Valida credenciales y permite acceso al admin por defecto
export function validarCredenciales(email, password) {
  const usuario = loginUsuario(email, password);
  if (usuario) return usuario;

  if (email === 'admin@kora.com' && password === '1234') {
    return { nombre: 'Admin', email, password, rol: 'admin' };
  }
  return null;
}

// Devuelve todos los usuarios registrados
export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
}

// Elimina todos los usuarios registrados (usado solo en tests o debug)
export function limpiarUsuarios() {
  localStorage.removeItem(CLAVE_USUARIOS);
}
