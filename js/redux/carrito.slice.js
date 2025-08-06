// redux/carrito.slice.js
import { createSlice } from '@reduxjs/toolkit';

// Intentamos recuperar el carrito guardado desde localStorage
const carritoGuardado = localStorage.getItem('reduxCarrito');

const estadoInicial = {
  items: carritoGuardado ? JSON.parse(carritoGuardado) : []
};

// Función auxiliar para guardar en localStorage
function guardarEnLocalStorage(items) {
  localStorage.setItem('reduxCarrito', JSON.stringify(items));
}

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: estadoInicial,
  reducers: {
    /**
     * Agrega un producto al carrito.
     * Si ya existe, aumenta la cantidad.
     */
    agregarProducto: (state, action) => {
      const nuevo = action.payload;
      const existe = state.items.find(p => p.id === nuevo.id);

      if (existe) {
        existe.cantidad += nuevo.cantidad;
      } else {
        state.items.push(nuevo);
      }

      guardarEnLocalStorage(state.items);
    },

    /**
     * Elimina un producto por su ID.
     */
    eliminarProducto: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(p => p.id !== id);
      guardarEnLocalStorage(state.items);
    },

    /**
     * Vacía todo el carrito.
     */
    vaciarCarrito: (state) => {
      state.items = [];
      localStorage.removeItem('reduxCarrito');
    }
  }
});

// Exportamos las acciones para usarlas en los controladores
export const {
  agregarProducto,
  eliminarProducto,
  vaciarCarrito
} = carritoSlice.actions;

// Exportamos el reducer para configurar el store
export default carritoSlice.reducer;
