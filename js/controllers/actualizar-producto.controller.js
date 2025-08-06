
import {
  obtenerTodosLosProductos,
  guardarProducto
} from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';
import { validarProducto } from '../utils/validarProducto.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Validar sesión y rol
  const sesion = getCookie('sesionKora');
  const user = sesion ? JSON.parse(sesion) : null;

  if (!user || user.rol !== 'admin') {
    alert('Acceso denegado. Solo administradores pueden ingresar aquí.');
    window.location.href = '../index.html';
    return;
  }

  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    alert('ID de producto no válido.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Buscar el producto por su ID en IndexedDB
  const productos = await obtenerTodosLosProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert('Producto no encontrado.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Rellenar los campos del formulario con los datos del producto
  document.getElementById('producto-id').value = producto.id;
  document.getElementById('nombre').value = producto.nombre;
  document.getElementById('descripcion').value = producto.descripcion;
  document.getElementById('precio').value = producto.precio;
  document.getElementById('imagen').value = producto.imagen;

  // Evento de envío del formulario
  document.getElementById('form-actualizar-producto').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const actualizado = {
      id: producto.id,
      nombre: document.getElementById('nombre').value.trim(),
      descripcion: document.getElementById('descripcion').value.trim(),
      precio: parseFloat(document.getElementById('precio').value),
      imagen: document.getElementById('imagen').value.trim(),
      autor: producto.autor || user.email
    };

    // Validaciones
    if (!actualizado.nombre || !actualizado.descripcion || !actualizado.precio || !actualizado.imagen) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (actualizado.descripcion.length > 150) {
      alert('La descripción no puede superar los 150 caracteres.');
      return;
    }

    if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(actualizado.imagen)) {
      alert('La URL debe ser válida y terminar en .jpg, .png, .gif, etc.');
      return;
    }

    // Guardar producto actualizado en IndexedDB
    await guardarProducto(actualizado);
    alert('Producto actualizado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
