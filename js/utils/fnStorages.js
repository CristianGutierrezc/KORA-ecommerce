// Manejo de productos públicos en la tienda
export function obtenerProductos() {
  return JSON.parse(localStorage.getItem('productos')) || [];
}

export function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Manejo de productos internos del panel admin (sin publicar)
export function obtenerAdminProductos() {
  return JSON.parse(localStorage.getItem('adminProductos')) || [];
}

export function guardarAdminProductos(productos) {
  localStorage.setItem('adminProductos', JSON.stringify(productos));
}

// Manejo del carrito
export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Manejo de sesión del usuario
export function obtenerSesion() {
  return JSON.parse(localStorage.getItem('sesionActiva')) || null;
}

export function guardarSesion(usuario) {
  localStorage.setItem('sesionActiva', JSON.stringify(usuario));
}

export function cerrarSesion() {
  localStorage.removeItem('sesionActiva');
}