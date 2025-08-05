import { eliminarProducto, obtenerTodosLosProductos } from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', async () => {
  const sesion = getCookie('sesionKora');
  const user = sesion ? JSON.parse(sesion) : null;

  if (!user || user.rol !== 'admin') {
    alert('Acceso restringido.');
    window.location.href = '../index.html';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

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

  const info = document.getElementById('info-producto');
  const btn = document.getElementById('btn-confirmar');

  info.innerHTML = `<strong>${producto.nombre}</strong><br>${producto.descripcion}<br><br><em>¿Estás seguro de eliminar este producto?</em>`;

  btn.addEventListener('click', async () => {
    await eliminarProducto(id);
    alert('Producto eliminado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
