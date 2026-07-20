'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (product: Product) => void;

  removeItem: (id: string) => void;

  updateQuantity: (id: string, quantity: number) => void;

  clearCart: () => void;

  total: number;

  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'wigs_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prevItems, {...product, quantity: 1}];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
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
