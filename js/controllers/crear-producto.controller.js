import { guardarProducto, obtenerTodosLosProductos } from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';
import { validarProducto } from '../utils/validarProducto.js';

document.addEventListener('DOMContentLoaded', () => {
  const sesion = getCookie('sesionKora');
  const user = sesion ? JSON.parse(sesion) : null;

  if (!user || user.rol !== 'admin') {
    alert('Acceso restringido. Solo para administradores.');
    window.location.href = '../index.html';
    return;
  }

  const form = document.getElementById('form-crear-producto');
  const nombre = document.getElementById('nombre');
  const descripcion = document.getElementById('descripcion');
  const precio = document.getElementById('precio');
  const imagen = document.getElementById('imagen');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevo = {
      id: crypto.randomUUID(),
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim(),
      precio: parseFloat(precio.value),
      imagen: imagen.value.trim(),
      autor: user.email // 🔥 aquí también lo enlazamos al creador
    };

    const productosActuales = await obtenerTodosLosProductos();
    const { valido, mensaje } = validarProducto(nuevo, productosActuales);
    if (!valido) {
      alert(mensaje);
      return;
    }

    await guardarProducto(nuevo);
    alert('Producto creado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
