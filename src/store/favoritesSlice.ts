// src/store/favoritesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

type FavoritesState = {
  ids: number[];
  byId: Record<number, Product>;
  hydrated: boolean;
};

const initialState: FavoritesState = {
  ids: [],
  byId: {},
  hydrated: false,
};

type TogglePayload = number | { id: number; item?: Product };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    hydrateFavorites: (
      state,
      action: PayloadAction<Partial<Pick<FavoritesState, "ids" | "byId">>>
    ) => {
      if (action.payload.ids) state.ids = action.payload.ids;
      if (action.payload.byId) state.byId = action.payload.byId;
      state.hydrated = true;
    },

    toggleFavorite: (state, action: PayloadAction<TogglePayload>) => {
      const { id, item } =
        typeof action.payload === "number"
          ? { id: action.payload, item: undefined }
          : action.payload;

      const idx = state.ids.indexOf(id);
      if (idx >= 0) {
        state.ids.splice(idx, 1);
        delete state.byId[id];
      } else {
        state.ids.unshift(id);
        if (item) state.byId[id] = item; // lưu luôn product nếu có
      }
    },

    clearFavorites: (state) => {
      state.ids = [];
      state.byId = {};
    },
  },
});

export const { hydrateFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

// Selectors tiện dùng
export const selectFavoriteIds = (s: any) => s.favorites.ids as number[];
export const selectFavoritesMap = (s: any) => s.favorites.byId as Record<number, Product>;
export const selectHydrated = (s: any) => !!s.favorites.hydrated;
