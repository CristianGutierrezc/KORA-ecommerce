// js/models/producto.model.js
// Manejo simple de productos usando localStorage

const CLAVE_PRODUCTOS = 'productosKora';

export function obtenerProductos() {
  return JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
}

export function agregarProducto(producto) {
  const productos = obtenerProductos();
  productos.push(producto);
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

export function eliminarProducto(id) {
  const productos = obtenerProductos().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

export function vaciarProductos() {
  localStorage.removeItem(CLAVE_PRODUCTOS);
}

export function crearProductoEjemplo() {
  return {
    id: crypto.randomUUID(),
    nombre: 'Camiseta Test',
    descripcion: 'Un producto de prueba',
    precio: 20,
    imagen: 'img/test.png'
  };
}
