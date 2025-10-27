import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearFavorites, toggleFavorite } from "../store/favoritesSlice";

export function useFavorites() {
  const dispatch = useDispatch();
  const { ids, hydrated } = useSelector((state: RootState) => state.favorites);

  const toggle = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch]
  );

  const isFavorite = useCallback(
    (id: number) => {
      return ids.includes(id);
    },
    [ids]
  );

  const clear = useCallback(() => {
    dispatch(clearFavorites());
  }, [dispatch]);

  return {
    favorites: ids,
    count: ids.length,
    toggle,
    isFavorite,
    clear,
    hydrated,
  };
}
