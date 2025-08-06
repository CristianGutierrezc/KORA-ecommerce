
export function agregarProducto(producto) {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push(producto);
  localStorage.setItem('productos', JSON.stringify(productos));
}

export function obtenerProductos() {
  return JSON.parse(localStorage.getItem('productos')) || [];
}

export function eliminarProducto(id) {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const filtrados = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(filtrados));
}

export function vaciarProductos() {
  localStorage.removeItem('productos');
}
