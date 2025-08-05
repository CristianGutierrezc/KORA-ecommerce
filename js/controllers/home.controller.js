import {
  obtenerTodosLosProductos,
  guardarProductosLista
} from '../utils/indexedDB.js';
import { obtenerSesion } from '../utils/fnStorages.js';

const productosEjemplo = [
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
];

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Mostrar enlaces admin si está logueado
  const sesion = obtenerSesion();
  if (sesion?.rol === 'admin') {
    document.getElementById('admin-link').style.display = 'inline-block';
    document.getElementById('admin-link-mobile').style.display = 'block';
  }
  //para mostrar perfil de usuario
if (sesion) {
  document.getElementById('perfil-link').style.display = 'inline-block';
  document.getElementById('perfil-link-mobile').style.display = 'block';
}


  // 2. Comprobar si ya hay productos
  let productos = await obtenerTodosLosProductos();
  if (!productos.length) {
    await guardarProductosLista(productosEjemplo);
    productos = await obtenerTodosLosProductos();
  }

  // 3. Renderizar productos
  renderProductos(productos);

  // 4. Activar buscador
  configurarBuscador(productos);

  // 5. Filtros por precio y nombre (opcional)
  configurarFiltros(productos);
});

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
}

function configurarBuscador(listaOriginal) {
  const buscador = document.getElementById('busqueda-productos');
  if (!buscador) return;

  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = listaOriginal.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );
    renderProductos(filtrados);
  });
}

function configurarFiltros(productos) {
  const selectPrecio = document.getElementById('orden-precio');
  const selectNombre = document.getElementById('orden-nombre');

  if (!selectPrecio || !selectNombre) return;

  selectPrecio.addEventListener('change', () => {
    let ordenados = [...productos];
    if (selectPrecio.value === 'asc') ordenados.sort((a, b) => a.precio - b.precio);
    if (selectPrecio.value === 'desc') ordenados.sort((a, b) => b.precio - a.precio);
    renderProductos(ordenados);
  });

  selectNombre.addEventListener('change', () => {
    let ordenados = [...productos];
    if (selectNombre.value === 'az') ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (selectNombre.value === 'za') ordenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    renderProductos(ordenados);
  });
}
import { getCookie, borrarCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  const sesion = getCookie('sesionKora');
  const usuario = sesion ? JSON.parse(sesion) : null;

  if (usuario) {
    document.getElementById('usuario-nombre').textContent = `Hola, ${usuario.nombre}`;
    document.getElementById('cerrar-sesion').style.display = 'inline-block';
  }

  const btnLogout = document.getElementById('cerrar-sesion');
  btnLogout?.addEventListener('click', () => {
    borrarCookie('sesionKora');
    localStorage.removeItem('sesionActiva');
    alert('Sesión cerrada.');
    window.location.href = '../index.html';
  });
});
