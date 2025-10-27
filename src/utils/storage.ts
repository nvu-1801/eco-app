import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  CART: "@eco-app:cart",
  FAVORITES: "@eco-app:favorites",
  PRODUCTS_CACHE: "@eco-app:products-cache",
};

export const storage = {
  // Cart
  async getCart() {
    try {
      const data = await AsyncStorage.getItem(KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting cart:", error);
      return [];
    }
  },

  async setCart(cart: any) {
    try {
      await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cart));
    } catch (error) {
      console.error("Error setting cart:", error);
    }
  },

  // Favorites
  async getFavorites(): Promise<number[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  },

  async setFavorites(favorites: number[]) {
    try {
      await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error setting favorites:", error);
    }
  },

  // Products Cache
  async getProductsCache() {
    try {
      const data = await AsyncStorage.getItem(KEYS.PRODUCTS_CACHE);
      if (!data) return null;

      const cached = JSON.parse(data);
      const now = Date.now();
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

      // Check if cache is still valid
      if (now - cached.timestamp > CACHE_DURATION) {
        return null;
      }

      return cached.products;
    } catch (error) {
      console.error("Error getting products cache:", error);
      return null;
    }
  },

  async setProductsCache(products: any) {
    try {
      await AsyncStorage.setItem(
        KEYS.PRODUCTS_CACHE,
        JSON.stringify({
          products,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error setting products cache:", error);
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.multiRemove([
        KEYS.CART,
        KEYS.FAVORITES,
        KEYS.PRODUCTS_CACHE,
      ]);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
