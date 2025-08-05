
import { createSlice } from '@reduxjs/toolkit';

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    items: JSON.parse(localStorage.getItem('carrito')) || []
  },
  reducers: {
    agregarAlCarrito: (state, action) => {
      const producto = action.payload;
      const existe = state.items.find(p => p.id === producto.id);

      if (existe) {
        existe.cantidad += 1;
      } else {
        state.items.push({ ...producto, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(state.items));
    },
    eliminarDelCarrito: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem('carrito', JSON.stringify(state.items));
    },
    actualizarCantidad: (state, action) => {
      const { id, cantidad } = action.payload;
      const producto = state.items.find(p => p.id === id);
      if (producto && cantidad > 0) {
        producto.cantidad = cantidad;
        localStorage.setItem('carrito', JSON.stringify(state.items));
      }
    },
    vaciarCarrito: (state) => {
      state.items = [];
      localStorage.removeItem('carrito');
    }
  }
});

export const {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  vaciarCarrito
} = carritoSlice.actions;

export default carritoSlice.reducer;
