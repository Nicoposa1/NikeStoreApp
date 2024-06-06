import {configureStore} from '@reduxjs/toolkit';
import {productsSlice} from './productsSlice';
import cartSlice from './cartSlice';
import {apiSlice} from './apiSlice';
import authSlice from './authSlice';


export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice,
    api: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
