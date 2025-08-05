const CLAVE_CARRITO = 'carritoKora';

/**
 * Agrega un producto al carrito.
 * Si ya existe, aumenta la cantidad.
 * @param {Object} producto
 */
export function agregarProducto(producto) {
  const carrito = obtenerCarrito();

  const existe = carrito.find(p => p.id === producto.id);
  if (existe) {
    existe.cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/**
 * Elimina un producto por ID.
 * @param {number} id
 */
export function eliminarProducto(id) {
  const carrito = obtenerCarrito().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/**
 * Devuelve el carrito completo.
 * @returns {Array}
 */
export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

/**
 * Vacía todo el carrito.
 */
export function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
}

/**
 * Calcula el total del carrito.
 * @param {Array} carrito
 * @returns {number}
 */
export function calcularTotal(carrito) {
  return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);