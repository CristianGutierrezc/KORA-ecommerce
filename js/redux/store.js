// js/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import carritoReducer from './carrito.slice.js';

const store = configureStore({
  reducer: {
    carrito: carritoReducer
  }
});

export default store;
