// js/components/minicart.js
import { store } from '../redux/store.js';
import { eliminarProducto } from '../redux/carrito.slice.js';

document.addEventListener('DOMContentLoaded', () => {
  const miniCart = document.getElementById('mini-cart');
  const cartIcon = document.getElementById('cart-icon');

  if (!miniCart || !cartIcon) return;

  // Mostrar u ocultar el mini carrito
  cartIcon.addEventListener('click', () => {
    miniCart.classList.toggle('visible');
    renderMiniCart();
  });

  function renderMiniCart() {
    const carrito = store.getState().carrito.productos;
    miniCart.innerHTML = '';

    if (carrito.length === 0) {
      miniCart.innerHTML = '<p style="text-align:center;">Carrito vacío</p>';
      return;
    }

    carrito.forEach(p => {
      miniCart.innerHTML += `
        <div class="item">
          <h4>${p.nombre}</h4>
          <p>${p.cantidad} x ${p.precio} €</p>
          <p>Subtotal: ${(p.precio * p.cantidad).toFixed(2)} €</p>
          <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
        </div>
      `;
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    miniCart.innerHTML += `<p class="mini-cart-total">Total: ${total.toFixed(2)} €</p>`;

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        store.dispatch(eliminarProducto(btn.dataset.id));
      });
    });
  }

  store.subscribe(renderMiniCart);
});
