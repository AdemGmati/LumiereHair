'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (
    product: Product,
    options?: { selected_lenght: string; selected_colors: string }
  ) => void;

  removeItem: (id: string, selected_lenght: string, selected_colors: string) => void;

  updateQuantity: (
    id: string,
    selected_lenght: string,
    selected_colors: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  total: number;

  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'wigs_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  // Start empty on both the server and client. Reading storage during the first
  // client render would make the navbar's badge differ from the server markup.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const hasHydratedCart = useRef(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      const savedItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

      // Defer the update until after the initial hydrated render.
      queueMicrotask(() => {
        hasHydratedCart.current = true;
        setCartItems(savedItems);
      });
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      hasHydratedCart.current = true;
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!hasHydratedCart.current) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (
    product: Product,
    options?: { selected_lenght: string; selected_colors: string }
  ) => {
    const selected_lenght = options?.selected_lenght ?? '18"';
    const selected_colors = options?.selected_colors ?? 'Standard';

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.selected_lenght === selected_lenght &&
          item.selected_colors === selected_colors
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.selected_lenght === selected_lenght &&
          item.selected_colors === selected_colors
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        { ...product, selected_lenght, selected_colors, quantity: 1 },
      ];
    });
  };

  const removeItem = (id: string, selected_lenght: string, selected_colors: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.selected_lenght === selected_lenght &&
            item.selected_colors === selected_colors
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    selected_lenght: string,
    selected_colors: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(id, selected_lenght, selected_colors);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        item.selected_lenght === selected_lenght &&
        item.selected_colors === selected_colors
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
