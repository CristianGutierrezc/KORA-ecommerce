
export function agregarProducto(carrito, producto) {
  return [...carrito, producto];
}

export function eliminarProducto(carrito, id) {
  return carrito.filter(item => item.id !== id);
}

export function calcularTotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}
