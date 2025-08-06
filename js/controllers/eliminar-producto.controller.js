// js/controllers/eliminar-producto.controller.js

import { eliminarProducto, obtenerTodosLosProductos } from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Verificamos si el usuario es admin
  const sesion = getCookie('sesionKora');
  const user = sesion ? JSON.parse(sesion) : null;

  if (!user || user.rol !== 'admin') {
    alert('Acceso restringido. Solo administradores pueden ingresar aquí.');
    window.location.href = '../index.html';
    return;
  }

  // Obtener ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID de producto no válido.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Buscar el producto por su ID
  const productos = await obtenerTodosLosProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert('Producto no encontrado.');
    window.location.href = 'dashboard.html';
    return;
  }

  // Mostrar detalles del producto en pantalla
  const detalle = document.getElementById('detalle-producto');
  detalle.innerHTML = `
    <div class="producto-card">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>${producto.precio.toFixed(2)} €</strong></p>
    </div>
  `;

  // Botón para confirmar la eliminación
  const btnEliminar = document.getElementById('confirmar-eliminacion');

  btnEliminar?.addEventListener('click', async () => {
    const confirmado = confirm(`¿Eliminar definitivamente el producto "${producto.nombre}"?`);

    if (!confirmado) return;

    await eliminarProducto(id);
    alert('Producto eliminado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
