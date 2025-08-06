
import { store } from '../redux/store.js';
import { eliminarProducto, vaciarCarrito } from '../redux/carrito.slice.js';

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('carrito-contenido');
  const total = document.getElementById('total-final');
  const btnVaciar = document.getElementById('vaciar-carrito');
  const btnFinalizar = document.getElementById('finalizar-compra');
  const contadorCarrito = document.getElementById('cart-count');

  function render() {
    const carrito = store.getState().carrito.productos;
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

  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-eliminar')) {
      const id = e.target.dataset.id;
      store.dispatch(eliminarProducto(id));
    }
  });

  btnVaciar?.addEventListener('click', () => {
    if (confirm('¿Vaciar todo el carrito?')) {
      store.dispatch(vaciarCarrito());
    }
  });

  btnFinalizar?.addEventListener('click', () => {
    const carrito = store.getState().carrito.productos;
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('Gracias por tu compra. ¡Te enviaremos un email de confirmación!');
    store.dispatch(vaciarCarrito());
  });

  store.subscribe(render);
  render();
});
