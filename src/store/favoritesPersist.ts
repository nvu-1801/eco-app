// src/store/favoritesPersist.ts
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { hydrateFavorites, toggleFavorite, clearFavorites } from "./favoritesSlice";
import type { RootState } from "@/store";
import { storage } from "@/utils/storage";

const KEY = "app:favorites:v2";

export const favoritesListener = createListenerMiddleware();

// Ghi ra storage khi favorites thay đổi
favoritesListener.startListening({
  matcher: isAnyOf(toggleFavorite, clearFavorites),
  effect: async (_action, api) => {
    const state = api.getState() as RootState;
    const data = {
      ids: state.favorites.ids,
      byId: state.favorites.byId,
    };
    try {
      await storage.setItem(KEY, JSON.stringify(data));
    } catch {}
  },
});

// Tải lên store lúc khởi tạo
export async function loadFavorites(dispatch: any) {
  try {
    const raw = await storage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      dispatch(hydrateFavorites({ ids: parsed.ids ?? [], byId: parsed.byId ?? {} }));
    } else {
      dispatch(hydrateFavorites({ ids: [], byId: {} }));
    }
  } catch {
    dispatch(hydrateFavorites({ ids: [], byId: {} }));
  }
}
