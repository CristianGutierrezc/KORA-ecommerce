// js/controllers/carrito.controller.js

import { store } from '../redux/store.js';
import { eliminarProducto, vaciarCarrito } from '../redux/carrito.slice.js';

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('carrito-contenido');
  const total = document.getElementById('total-final');
  const btnVaciar = document.getElementById('vaciar-carrito');
  const btnFinalizar = document.getElementById('finalizar-compra');
  const contadorCarrito = document.getElementById('cart-count');

  // Función para renderizar los productos del carrito
  function render() {
    const carrito = store.getState().carrito.items;
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
      total.textContent = '0 €';
      contadorCarrito.textContent = '0';
      return;
    }

    let suma = 0;
    let cantidadTotal = 0;

    carrito.forEach(p => {
      const subtotal = p.precio * p.cantidad;
      suma += subtotal;
      cantidadTotal += p.cantidad;

      contenedor.innerHTML += `
        <div class="producto-card">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <p>Cantidad: ${p.cantidad}</p>
          <p>Subtotal: ${subtotal.toFixed(2)} €</p>
          <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
        </div>
      `;
    });

    total.textContent = suma.toFixed(2) + ' €';
    contadorCarrito.textContent = cantidadTotal;
  }

  // Evento para eliminar productos individualmente
  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-eliminar')) {
      const id = e.target.dataset.id;
      store.dispatch(eliminarProducto(id));
    }
  });

  // Botón para vaciar el carrito completamente
  btnVaciar?.addEventListener('click', () => {
    if (confirm('¿Vaciar todo el carrito?')) {
      store.dispatch(vaciarCarrito());
    }
  });

  // Botón para finalizar compra
  btnFinalizar?.addEventListener('click', () => {
    const carrito = store.getState().carrito.items;
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('Gracias por tu compra. ¡Te enviaremos un email de confirmación!');
    store.dispatch(vaciarCarrito());
  });

  // Suscribimos el render a los cambios del store
  store.subscribe(render);

  render(); // Render inicial
});
// MINI-CARRITO dinámico al pasar el mouse
const miniCart = document.getElementById('mini-cart');
const iconCart = document.getElementById('cart-icon');

// Función que renderiza el mini carrito flotante
function renderMiniCart() {
  const carrito = store.getState().carrito.items;
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
      </div>
    `;
  });

  const totalMini = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  miniCart.innerHTML += `<p class="mini-cart-total">Total: ${totalMini.toFixed(2)} €</p>`;
}

// Mostrar y ocultar el mini carrito al hacer hover sobre el ícono
iconCart?.addEventListener('mouseenter', () => {
  renderMiniCart();
  miniCart.classList.add('active');
});

iconCart?.addEventListener('mouseleave', () => {
  setTimeout(() => miniCart.classList.remove('active'), 300);
});

miniCart?.addEventListener('mouseenter', () => {
  miniCart.classList.add('active');
});

miniCart?.addEventListener('mouseleave', () => {
  miniCart.classList.remove('active');
});

// Asegura que el mini carrito también se actualiza al cambiar el estado
store.subscribe(renderMiniCart);
