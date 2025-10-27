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
        // Load cart from storage
        const cart = await storage.getCart();
        if (cart && cart.length > 0) {
          dispatch(hydrateCart(cart));
        }

        // Load favorites from storage
        const favorites = await storage.getFavorites();
        if (favorites && favorites.length > 0) {
          dispatch(hydrateFavorites(favorites));
        }

        setIsReady(true);
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsReady(true); // Still set ready even on error
      }
    };

    initializeApp();
  }, [dispatch]);

  return { isReady };
}
