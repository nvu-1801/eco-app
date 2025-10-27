import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../utils/storage";

type FavoritesState = {
  ids: number[];
  hydrated: boolean;
};

const initialState: FavoritesState = {
  ids: [],
  hydrated: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    hydrateFavorites: (state, action: PayloadAction<number[]>) => {
      state.ids = action.payload;
      state.hydrated = true;
    },

    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.ids.indexOf(action.payload);
      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(action.payload);
      }
      storage.setFavorites(state.ids);
    },

    clearFavorites: (state) => {
      state.ids = [];
      storage.setFavorites([]);
    },
  },
});

export const { hydrateFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
