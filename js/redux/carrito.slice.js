// redux/carrito.slice.js
import { createSlice } from '@reduxjs/toolkit';

// Recuperamos carrito desde localStorage
const carritoGuardado = localStorage.getItem('reduxCarrito');

const estadoInicial = {
  productos: carritoGuardado ? JSON.parse(carritoGuardado) : []
};

// Guardar estado en localStorage
function guardarEnLocalStorage(productos) {
  localStorage.setItem('reduxCarrito', JSON.stringify(productos));
}

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: estadoInicial,
  reducers: {
    agregarProducto: (state, action) => {
      const nuevo = action.payload;
      const existe = state.productos.find(p => p.id === nuevo.id);

      if (existe) {
        existe.cantidad += nuevo.cantidad;
      } else {
        state.productos.push(nuevo);
      }

      guardarEnLocalStorage(state.productos);
    },

    eliminarProducto: (state, action) => {
      const id = action.payload;
      state.productos = state.productos.filter(p => p.id !== id);
      guardarEnLocalStorage(state.productos);
    },

    vaciarCarrito: (state) => {
      state.productos = [];
      localStorage.removeItem('reduxCarrito');
    }
  }
});

export const {
  agregarProducto,
  eliminarProducto,
  vaciarCarrito
} = carritoSlice.actions;

export default carritoSlice.reducer;
