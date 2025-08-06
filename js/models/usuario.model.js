
export function agregarUsuario(usuario) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

export function loginUsuario(email, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  return usuarios.find(u => u.email === email && u.password === password) || null;
}

export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

export function limpiarUsuarios() {
  localStorage.removeItem('usuarios');
}
