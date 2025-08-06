// js/components/minicart.js
import { store } from '../redux/store.js';
import { eliminarDelCarrito } from '../redux/carrito.slice.js';

document.addEventListener('DOMContentLoaded', () => {
  const miniCart = document.getElementById('mini-cart');
  const cartIcon = document.getElementById('cart-icon');

  if (!miniCart || !cartIcon) return;

  // Alternar visibilidad del mini carrito
  cartIcon.addEventListener('click', () => {
    miniCart.classList.toggle('visible');
    renderMiniCart();
  });

  // Renderizar productos del carrito
  const renderMiniCart = () => {
    const estado = store.getState();
    const productos = estado.carrito.productos;

    if (productos.length === 0) {
      miniCart.innerHTML = '<p class="empty-cart">Carrito vacío</p>';
      return;
    }

    miniCart.innerHTML = `
      <h3>Tu carrito</h3>
      <ul class="mini-cart-list">
        ${productos.map(p => `
          <li>
            <span>${p.nombre}</span>
            <button class="btn-eliminar" data-id="${p.id}">❌</button>
          </li>
        `).join('')}
      </ul>
      <a href="pages/carrito.html" class="btn-ver-carrito">Ver carrito completo</a>
    `;

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        store.dispatch(eliminarDelCarrito(id));
        renderMiniCart(); // actualizar al instante
      });
    });
  };

  // Suscribirse a Redux para actualizar contador y mini carrito
  store.subscribe(() => {
    const productos = store.getState().carrito.productos;
    const count = productos.reduce((acc, p) => acc + p.cantidad, 0);
    document.getElementById('cart-count').textContent = count;
    renderMiniCart();
  });
});
