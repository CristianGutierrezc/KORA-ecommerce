// __test__/carrito.model.test.js

import {
  agregarProducto,
  eliminarProducto,
  obtenerCarrito,
  vaciarCarrito
} from '../js/models/carrito.model.js';

describe('🛒 Carrito Model', () => {

  // Limpiar localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear();
  });

  test('debería agregar un producto al carrito', () => {
    const producto = { id: 1, nombre: 'Camiseta', precio: 20, cantidad: 1 };
    agregarProducto(producto);

    const carrito = obtenerCarrito();
    expect(carrito).toHaveLength(1);
    expect(carrito[0]).toEqual(producto);
  });

  test('debería eliminar un producto del carrito por ID', () => {
    agregarProducto({ id: 1, nombre: 'Camiseta', precio: 20, cantidad: 1 });
    agregarProducto({ id: 2, nombre: 'Pantalón', precio: 40, cantidad: 1 });

    eliminarProducto(2);

    const carrito = obtenerCarrito();
    expect(carrito).toHaveLength(1);
    expect(carrito[0].id).toBe(1);
  });

  test('debería vaciar el carrito completo', () => {
    agregarProducto({ id: 1, nombre: 'Camiseta', precio: 20, cantidad: 1 });
    agregarProducto({ id: 2, nombre: 'Gorra', precio: 15, cantidad: 1 });

    vaciarCarrito();

    const carrito = obtenerCarrito();
    expect(carrito).toEqual([]);
  });
});
