// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '@/services/productsApi';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
