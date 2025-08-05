import { guardarProducto, obtenerTodosLosProductos } from '../utils/indexedDB.js';
import { getCookie } from '../utils/cookies.js';

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

    // Validaciones
    if (!nuevo.nombre || !nuevo.descripcion || !nuevo.precio || !nuevo.imagen) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (nuevo.descripcion.length > 150) {
      alert('La descripción no puede superar los 150 caracteres.');
      return;
    }

    if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(nuevo.imagen)) {
      alert('La imagen debe tener un formato válido (.jpg, .png, etc).');
      return;
    }

    const productosActuales = await obtenerTodosLosProductos();
    const duplicado = productosActuales.find(p => p.nombre.toLowerCase() === nuevo.nombre.toLowerCase());

    if (duplicado) {
      alert('Ya existe un producto con ese nombre.');
      return;
    }

    await guardarProducto(nuevo);
    alert('Producto creado correctamente.');
    window.location.href = 'dashboard.html';
  });
});
