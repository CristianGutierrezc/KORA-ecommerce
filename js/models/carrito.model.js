const CLAVE_CARRITO = 'carritoKora';

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

export function eliminarProducto(id) {
  const carrito = obtenerCarrito().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

export function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
}

export function calcularTotal(carrito) {
  return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
}
