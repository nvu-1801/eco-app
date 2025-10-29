import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hydrateCart } from "../store/cartSlice";
import { hydrateFavorites } from "../store/favoritesSlice";
import { storage } from "../utils/storage";

export function useAppInitialization() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Cart
        const cart = (await storage.getCart()) ?? [];
        dispatch(hydrateCart(cart)); // ✅ luôn hydrate, kể cả []

        // Favorites (ids-only version)
        const favorites = (await storage.getFavorites()) ?? [];
        dispatch(hydrateFavorites(favorites)); // ✅ luôn hydrate, kể cả []

      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsReady(true); 
      }
    };

    initializeApp();
  }, [dispatch]);

  return { isReady };
}
