import {
  obtenerTodosLosProductos,
  guardarProducto
} from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', async () => {
  const sesion = getCookie('sesionKora');
  const user = sesion ? JSON.parse(sesion) : null;

  if (!user || user.rol !== 'admin') {
    alert('Acceso denegado.');
    window.location.href = '../index.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    alert('Producto no válido.');
    window.location.href = 'dashboard.html';
    return;
  }

  const productos = await obtenerTodosLosProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert('Producto no encontrado.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Referencias al DOM
  document.getElementById('producto-id').value = producto.id;
  document.getElementById('nombre').value = producto.nombre;
  document.getElementById('descripcion').value = producto.descripcion;
  document.getElementById('precio').value = producto.precio;
  document.getElementById('imagen').value = producto.imagen;

  document.getElementById('form-actualizar-producto').addEventListener('submit', async (e) => {
    e.preventDefault();

   const actualizado = {
  id,
  nombre: nombre.value.trim(),
  descripcion: descripcion.value.trim(),
  precio: parseFloat(precio.value),
  imagen: imagen.value.trim(),
  autor: producto.autor || user.email // 🔥 mantenemos autor original o lo definimos si no existía
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
      alert('La URL de la imagen debe ser válida.');
      return;
    }

    await guardarProducto(actualizado);
    alert('Producto actualizado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
