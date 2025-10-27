import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addItem,
  clearCart,
  removeItem,
  updateQuantity,
} from "../store/cartSlice";
import type { Product } from "../types/product";

export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalDiscount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const originalPrice = item.price / (1 - item.discountPercentage / 100);
      const discount = (originalPrice - item.price) * item.quantity;
      return sum + discount;
    }, 0);
  }, [cartItems]);

  const addToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId: number) => {
    dispatch(removeItem(productId));
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  const clearAllItems = () => {
    dispatch(clearCart());
  };

  const getItemQuantity = (productId: number): number => {
    const item = cartItems.find((item) => item.id === productId);
    return item?.quantity || 0;
  };

  const isInCart = (productId: number): boolean => {
    return cartItems.some((item) => item.id === productId);
  };

  return {
    items: cartItems,
    itemCount,
    totalPrice,
    totalDiscount,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearAllItems,
    getItemQuantity,
    isInCart,
  };
}
