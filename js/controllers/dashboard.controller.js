// js/controllers/dashboard.controller.js
import { obtenerSesion } from '../utils/fnStorages.js';
import {
  obtenerTodosLosProductos,
  guardarProducto,
  guardarProductosLista,
  eliminarProducto
} from '../utils/indexedDB.js';
import { validarProducto } from '../utils/validarProducto.js';

document.addEventListener('DOMContentLoaded', async () => {
  const sesion = obtenerSesion();

  // Verificación de acceso
  if (!sesion || sesion.rol !== 'admin') {
    alert('Acceso denegado. Solo administradores pueden ingresar aquí.');
    window.location.href = '../index.html';
    return;
  }

  // Referencias al DOM
  const lista = document.getElementById('lista-admin');
  const form = document.getElementById('form-producto');
  const nombre = document.getElementById('nombre');
  const descripcion = document.getElementById('descripcion');
  const precio = document.getElementById('precio');
  const imagen = document.getElementById('imagen');
  const idField = document.getElementById('producto-id');
  const btnCargar = document.getElementById('cargar-ejemplo');
  const btnVaciar = document.getElementById('vaciar-lista');
  const btnPublicar = document.getElementById('publicar-tienda');

  // Productos del admin (simula backend personal)
  let adminProductos = await obtenerTodosLosProductos();

  // Renderiza productos en pantalla
  function renderLista() {
    lista.innerHTML = '';

    if (adminProductos.length === 0) {
      lista.innerHTML = '<p style="text-align:center;">No hay productos cargados.</p>';
      return;
    }

    adminProductos.forEach(p => {
      const div = document.createElement('div');
      div.className = 'producto-card';
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><strong>${p.precio.toFixed(2)} €</strong></p>
        <a href="actualizar-producto.html?id=${p.id}" class="btn-editar">Editar</a>
        <a href="eliminar-producto.html?id=${p.id}" class="btn-eliminar">Eliminar</a>
      `;
      lista.appendChild(div);
    });
  }

  // Validaciones del formulario
  function camposValidos(p) {
    if (!p.nombre || !p.descripcion || !p.precio || !p.imagen) {
      alert('Todos los campos son obligatorios.');
      return false;
    }

    if (p.descripcion.length > 150) {
      alert('La descripción no puede superar los 150 caracteres.');
      return false;
    }

    const urlRegex = /\.(jpeg|jpg|png|webp|gif)$/i;
    if (!urlRegex.test(p.imagen)) {
      alert('La URL debe ser válida y terminar en .jpg, .png, etc.');
      return false;
    }

    const duplicado = adminProductos.some(prod => prod.nombre === p.nombre && prod.id !== p.id);
    if (duplicado) {
      alert('Ya existe un producto con ese nombre.');
      return false;
    }

    return true;
  }

  // Crear o editar producto
  form.addEventListener('submit', async e => {
    e.preventDefault();
    e.preventDefault();

    const nuevoProducto = {
      id: idField.value || crypto.randomUUID(),
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim(),
      precio: parseFloat(precio.value),
      imagen: imagen.value.trim(),
      autor: sesion.email
    };

    if (!camposValidos(nuevoProducto)) return;

    await guardarProducto(nuevoProducto);
    adminProductos = await obtenerTodosLosProductos();
    form.reset();
    renderLista();
  });
    await guardarProducto(nuevoProducto);
    adminProductos = await obtenerTodosLosProductos();
    form.reset();
    renderLista();
  });

  // Botón: cargar productos de ejemplo
  btnCargar.addEventListener('click', async () => {
    if (adminProductos.length > 0) {
      alert('Ya tienes productos cargados.');
      return;
    }

    const ejemplos = [
      {
        id: crypto.randomUUID(),
        nombre: 'Chaqueta Matrix',
        descripcion: 'Chaqueta oversize con cuello futurista.',
        precio: 129.99,
        imagen: 'img/producto3.png',
        autor: sesion.email
      },
      {
        id: crypto.randomUUID(),
        nombre: 'Zapatillas Null',
        descripcion: 'Zapatillas unisex diseño digital.',
        precio: 159.99,
        imagen: 'img/producto4.png',
        autor: sesion.email
      }
    ];

    await guardarProductosLista(ejemplos);
    adminProductos = await obtenerTodosLosProductos();
    renderLista();
  });

  // Botón: vaciar productos
  btnVaciar.addEventListener('click', async () => {
    if (confirm('¿Vaciar todos los productos del panel admin?')) {
      for (const producto of adminProductos) {
        await eliminarProducto(producto.id);
      }
      adminProductos = [];
      renderLista();
    }
  });

  // Botón: publicar (ya están guardados en IndexedDB)
  btnPublicar.addEventListener('click', () => {
    if (adminProductos.length === 0) {
      alert('No hay productos para publicar.');
      return;
    }

    alert('Productos publicados correctamente. Ya son visibles en la tienda.');
  });

  // Menú hamburguesa admin
  const toggleAdminMenu = document.getElementById("admin-menu-toggle");
  const closeAdminMenu = document.getElementById("admin-menu-close");
  const adminMenu = document.getElementById("admin-menu");

  toggleAdminMenu?.addEventListener("click", () => {
    adminMenu.classList.add("activo");
  });

  closeAdminMenu?.addEventListener("click", () => {
    adminMenu.classList.remove("activo");
  });

  // Mostrar productos
  renderLista();
});
