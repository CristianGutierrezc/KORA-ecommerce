import {
  obtenerTodosLosProductos,
  guardarProducto
} from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';
import { validarProducto } from '../utils/validarProducto.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Validar sesión
  const sesion = getCookie('sesionKora');
  const user = sesion ? JSON.parse(sesion) : null;

  if (!user || user.rol !== 'admin') {
    alert('Acceso denegado. Solo administradores pueden ingresar aquí.');
    window.location.href = '../index.html';
    return;
  }

  // Obtener ID del producto por URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    alert('ID de producto no válido.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Obtener producto desde IndexedDB
  const productos = await obtenerTodosLosProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert('Producto no encontrado.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Referencias al DOM
  const form = document.getElementById('form-actualizar-producto');
  const nombre = document.getElementById('nombre');
  const descripcion = document.getElementById('descripcion');
  const precio = document.getElementById('precio');
  const imagen = document.getElementById('imagen');
  const idField = document.getElementById('producto-id');

  // Rellenar el formulario con el producto
  idField.value = producto.id;
  nombre.value = producto.nombre;
  descripcion.value = producto.descripcion;
  precio.value = producto.precio;
  imagen.value = producto.imagen;

  // Evento submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const actualizado = {
      id: producto.id,
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim(),
      precio: parseFloat(precio.value),
      imagen: imagen.value.trim(),
      autor: producto.autor || user.email
    };

    const resultado = validarProducto(actualizado, productos);
    if (!resultado.valido) {
      alert(resultado.mensaje);
      return;
    }

    await guardarProducto(actualizado);
    alert('Producto actualizado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
