// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import carritoReducer from './carrito.slice.js';

export const store = configureStore({
  reducer: {
    carrito: carritoReducer
  }
});
