// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/propertyCart';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store
