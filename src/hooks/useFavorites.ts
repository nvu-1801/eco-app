// src/hooks/useFavorites.ts
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { RootState, AppDispatch } from "@/store"; // chỉnh path cho khớp dự án
import { clearFavorites, toggleFavorite } from "@/store/favoritesSlice";
import type { Product } from "@/types/product";

export function useFavorites() {
  const dispatch = useDispatch<AppDispatch>();

  const { ids, hydrated } = useSelector(
    (state: RootState) => ({
      ids: state.favorites.ids,           // number[]
      hydrated: state.favorites.hydrated, // boolean
    }),
    shallowEqual
  );

  // Dùng Set để check O(1)
  const idSet = useMemo(() => new Set<number>(ids), [ids]);

  /** Toggle favorite: nhận id và có thể kèm product để lưu vào byId */
  const toggle = useCallback(
    (id: number | string, item?: Product) => {
      const numId = Number(id);
      // flow mới: slice nhận { id, item? }
      dispatch(toggleFavorite({ id: numId, item }));
    },
    [dispatch]
  );

  /** Kiểm tra có trong favorites không */
  const isFavorite = useCallback(
    (id: number | string) => idSet.has(Number(id)),
    [idSet]
  );

  /** Xoá toàn bộ */
  const clear = useCallback(() => {
    dispatch(clearFavorites());
  }, [dispatch]);

  return useMemo(
    () => ({
      favorites: ids,
      count: ids.length,
      toggle,        // (id, item?) => void
      isFavorite,    // (id) => boolean
      clear,
      hydrated,
    }),
    [ids, hydrated, toggle, isFavorite, clear]
  );
}
