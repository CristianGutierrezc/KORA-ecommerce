import store from '../redux/store.js';
import {
  agregarAlCarrito,
  eliminarDelCarrito
   vaciarCarrito 
} from '../redux/carrito.slice.js';
import { obtenerProductos } from '../utils/fnStorages.js';

document.addEventListener('DOMContentLoaded', () => {
  const miniCart = document.getElementById('mini-cart');
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const carritoContenido = document.getElementById('carrito-contenido');
  const totalFinal = document.getElementById('total-final');

  // 🎯 Agregar producto al carrito
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
      const id = e.target.dataset.id;
      const productos = obtenerProductos();
      const producto = productos.find(p => p.id === id);
      if (producto) {
        store.dispatch(agregarAlCarrito(producto));
        renderMiniCarrito();
        actualizarContador();
        renderPaginaCarrito(); // por si estamos en carrito.html
      }
    }

    if (e.target.classList.contains('btn-eliminar')) {
      const id = e.target.dataset.id;
      store.dispatch(eliminarDelCarrito(id));
      renderMiniCarrito();
      actualizarContador();
      renderPaginaCarrito();
    }
  });

  // 🎯 Mostrar/ocultar mini carrito
  cartIcon?.addEventListener('click', () => {
    miniCart?.classList.toggle('visible');
  });

  // ✅ Actualizar contador de carrito
  function actualizarContador() {
    const carrito = store.getState().carrito.items;
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = total;
  }

  // ✅ Render mini carrito
  function renderMiniCarrito() {
    const carrito = store.getState().carrito.items;
    miniCart.innerHTML = '<h4>Carrito</h4>';

    if (carrito.length === 0) {
      miniCart.innerHTML += '<p>Tu carrito está vacío.</p>';
      return;
    }

    carrito.forEach(p => {
      miniCart.innerHTML += `
        <div class="item-carrito">
          <span>${p.nombre}</span> x${p.cantidad}
          <span>${(p.precio * p.cantidad).toFixed(2)} €</span>
        </div>
      `;
    });

    const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    miniCart.innerHTML += `<p><strong>Total: ${total.toFixed(2)} €</strong></p>`;
    miniCart.innerHTML += `<a href="pages/carrito.html" class="btn-ver-carrito">Ver carrito completo</a>`;
  }

  // ✅ Render página carrito.html si estamos ahí
  function renderPaginaCarrito() {
    if (!carritoContenido || !totalFinal) return;

    const carrito = store.getState().carrito.items;
    carritoContenido.innerHTML = '';

    if (carrito.length === 0) {
      carritoContenido.innerHTML = '<p style="text-align:center;">Tu carrito está vacío.</p>';
      totalFinal.textContent = '0 €';
      return;
    }

    carrito.forEach(p => {
      const div = document.createElement('div');
      div.className = 'producto-card';
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="producto-img"/>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p>Precio unidad: ${p.precio} €</p>
        <p>Cantidad: ${p.cantidad}</p>
        <p>Subtotal: ${(p.precio * p.cantidad).toFixed(2)} €</p>
        <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
      `;
      carritoContenido.appendChild(div);
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalFinal.textContent = total.toFixed(2) + ' €';
  }

  // 🟢 Inicialización
  renderMiniCarrito();
  actualizarContador();
  renderPaginaCarrito();
});
  // 🎯 Finalizar compra
  const btnFinalizar = document.getElementById('finalizar-compra');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
      if (confirm('¿Deseas finalizar la compra?')) {
        store.dispatch(limpiarCarrito());
        alert('Gracias por tu compra. Carrito vaciado.');
        renderMiniCarrito();
        renderPaginaCarrito();
        actualizarContador();
      }
    });
  }
export function calcularTotal(carrito) {
  return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
}
