// src/store/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import { storage } from "../utils/storage";

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean; // Track if loaded from storage
};

const initialState: CartState = {
  items: [],
  hydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Hydrate from AsyncStorage
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.hydrated = true;
    },

    // Add item (renamed from addToCart to addItem for consistency)
    addItem: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.items.findIndex(
        (i) => i.id === action.payload.id
      );
      if (existingIndex >= 0) {
        const existing = state.items[existingIndex];
        if (existing.quantity < existing.stock) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      storage.setCart(state.items);
    },

    // Remove item
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      storage.setCart(state.items);
    },

    // Update quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else if (action.payload.quantity <= item.stock) {
          item.quantity = action.payload.quantity;
        }
      }
      storage.setCart(state.items);
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      storage.setCart([]);
    },
  },
});

export const { hydrateCart, addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
