
import {
  agregarProducto,
  obtenerProductos,
  eliminarProducto,
  vaciarProductos
} from '../js/models/producto.model.js';

describe('🧪 Productos Model', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('debería agregar un producto correctamente', () => {
    const nuevoProducto = {
      id: 1,
      nombre: 'Zapatillas Futuristas',
      descripcion: 'Alta tecnología y estilo',
      precio: 89.99,
      imagen: 'img/zapatillas.png'
    };

    agregarProducto(nuevoProducto);
    const productos = obtenerProductos();

    expect(productos).toHaveLength(1);
    expect(productos[0].nombre).toBe('Zapatillas Futuristas');
    expect(productos[0].precio).toBeCloseTo(89.99);
  });

  test('debería obtener varios productos', () => {
    agregarProducto({ id: 1, nombre: 'Camiseta', precio: 20 });
    agregarProducto({ id: 2, nombre: 'Gorra', precio: 15 });

    const productos = obtenerProductos();
    expect(productos.length).toBe(2);
  });

  test('debería eliminar un producto por ID', () => {
    agregarProducto({ id: 1, nombre: 'Sudadera' });
    agregarProducto({ id: 2, nombre: 'Pantalón' });

    eliminarProducto(2);
    const productos = obtenerProductos();

    expect(productos.length).toBe(1);
    expect(productos[0].id).toBe(1);
  });

  test('debería vaciar todos los productos', () => {
    agregarProducto({ id: 1, nombre: 'Camiseta' });
    agregarProducto({ id: 2, nombre: 'Chaqueta' });

    vaciarProductos();
    const productos = obtenerProductos();

    expect(productos).toEqual([]);
  });
});
