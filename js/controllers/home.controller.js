
import {
  obtenerTodosLosProductos,
  guardarProductosLista
} from '../utils/indexedDB.js';

import { obtenerSesion } from '../utils/fnStorages.js';
import { agregarProducto } from '../redux/carrito.slice.js';
import { store } from '../redux/store.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Mostrar enlaces del panel si es admin
  const sesion = obtenerSesion();
  if (sesion?.rol === 'admin') {
    document.getElementById('admin-link')?.style.setProperty('display', 'inline-block');
    document.getElementById('admin-link-mobile')?.style.setProperty('display', 'block');
  }

  // Cargar productos desde IndexedDB o insertar ejemplos si está vacío
  let productos = await obtenerTodosLosProductos();
  if (!productos.length) {
    await guardarProductosLista([
      {
        id: crypto.randomUUID(),
        nombre: 'Chaqueta Matrix',
        descripcion: 'Chaqueta oversize con cuello',
        precio: 129.99,
        imagen: 'img/producto3.png'
      },
      {
        id: crypto.randomUUID(),
        nombre: 'Zapatillas Null',
        descripcion: 'Diseño unisex',
        precio: 159.99,
        imagen: 'img/producto4.png'
      }
    ]);
    productos = await obtenerTodosLosProductos();
  }

  // Inicializar interfaz
  crearControlesDeFiltro();         // Selects y buscador
  renderProductos(productos);       // Mostrar productos
  configurarBuscador(productos);    // Activar búsqueda
  configurarFiltros(productos);     // Activar filtros
});

/**
 * Crea los controles superiores: buscador, filtros y cambio de vista
 */
function crearControlesDeFiltro() {
  const main = document.querySelector('main');
  if (!main) return;

  const controles = document.createElement('div');
  controles.className = 'barra-controles';
  controles.innerHTML = `
    <select id="ordenar">
      <option value="defecto">Ordenar</option>
      <option value="az">A-Z</option>
      <option value="za">Z-A</option>
    </select>
    <select id="precio">
      <option value="defecto">Filtrar precio</option>
      <option value="mayor">Mayor a menor</option>
      <option value="menor">Menor a mayor</option>
    </select>
    <button id="vista-toggle">Cambiar Vista</button>
    <input type="text" id="busqueda-productos" placeholder="Buscar productos..." class="busqueda-input" />
  `;
  main.prepend(controles);

  // Alternar entre vista grilla y lista
  document.getElementById('vista-toggle').addEventListener('click', () => {
    const grid = document.getElementById('contenedor-productos');
    grid.classList.toggle('grid-productos');
    grid.classList.toggle('vista-lista');
  });
}

/**
 * Pinta los productos en pantalla
 * @param {Array} lista
 */
function renderProductos(lista) {
  const contenedor = document.getElementById('contenedor-productos');
  const mensajeVacio = document.getElementById('mensaje-vacio');
  contenedor.innerHTML = '';

  if (!lista.length) {
    mensajeVacio.style.display = 'block';
    return;
  }

  mensajeVacio.style.display = 'none';

  lista.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img"/>
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <span class="precio">${producto.precio} €</span>
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  configurarBotonesAgregar(); // Solo aquí se debe ejecutar
}

/**
 * Activa la búsqueda por texto
 * @param {Array} productos
 */
function configurarBuscador(productos) {
  const buscador = document.getElementById('busqueda-productos');
  buscador?.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto)
    );
    renderProductos(filtrados);
  });
}

/**
 * Aplica filtros de orden y precio
 * @param {Array} productos
 */
function configurarFiltros(productos) {
  const ordenarSelect = document.getElementById('ordenar');
  const precioSelect = document.getElementById('precio');

  ordenarSelect?.addEventListener('change', () => {
    let copia = [...productos];
    if (ordenarSelect.value === 'az') copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (ordenarSelect.value === 'za') copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
    renderProductos(copia);
  });

  precioSelect?.addEventListener('change', () => {
    let copia = [...productos];
    if (precioSelect.value === 'menor') copia.sort((a, b) => a.precio - b.precio);
    if (precioSelect.value === 'mayor') copia.sort((a, b) => b.precio - a.precio);
    renderProductos(copia);
  });
}

/**
 * Conecta los botones "Agregar al carrito" al store Redux
 */
function configurarBotonesAgregar() {
  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const productos = await obtenerTodosLosProductos();
      const producto = productos.find(p => p.id === id);

      if (producto) {
        store.dispatch(agregarProducto({ ...producto, cantidad: 1 }));
        alert(`✅ ${producto.nombre} añadido al carrito.`);
      }
    });
  });
}
