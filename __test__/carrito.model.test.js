
import {
  agregarProducto,
  eliminarProducto,
  calcularTotal,
} from '../js/models/carrito.model';

describe('🛒 Carrito Model', () => {
  test('debería agregar un producto al carrito', () => {
    const carrito = [];
    const producto = { id: 1, nombre: 'Camiseta', precio: 20, cantidad: 1 };

    const resultado = agregarProducto(carrito, producto);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nombre).toBe('Camiseta');
  });

  test('debería eliminar un producto por ID', () => {
    const carrito = [
      { id: 1, nombre: 'Camiseta', precio: 20, cantidad: 1 },
      { id: 2, nombre: 'Pantalón', precio: 30, cantidad: 1 },
    ];

    const resultado = eliminarProducto(carrito, 1);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(2);
  });

  test('debería calcular el total correctamente', () => {
    const carrito = [
      { id: 1, precio: 10, cantidad: 2 },
      { id: 2, precio: 15, cantidad: 1 },
    ];

    const total = calcularTotal(carrito);
    expect(total).toBe(35);
  });
});
