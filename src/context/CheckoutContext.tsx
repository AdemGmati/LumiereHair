"use client";

/**
 * CheckoutContext — decides *what* is being purchased right now.
 * Suggested location: context/CheckoutContext.tsx (next to your CartContext)
 *
 * Two ways into checkout:
 *   1. Buy Now (Product Details) → startBuyNow(product, quantity, ...) → snapshot of ONE item
 *   2. Checkout (Cart Slider)    → checkoutCart()                      → reads CartContext live
 *
 * CheckoutItem is CartItem itself, plus two optional fields (selectedLength /
 * selectedColor) that only the buy-now path fills in, since CartItem doesn't
 * track a selected variant yet. That means cartItems can be handed to the
 * checkout page with zero mapping — there's only ever one source of truth
 * for what's in the cart.
 *
 * Wrap your root layout with <CheckoutProvider> alongside <CartProvider>.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductColor } from "@/types/product";
import type { CartItem } from "@/types/cart";

export interface CheckoutItem extends CartItem {
  selectedLength?: string | null;
  selectedColor?: ProductColor | null;
}

export type CheckoutSource = "buy-now" | "cart";

interface CheckoutContextType {
  source: CheckoutSource | null;
  buyNowItem: CheckoutItem | null;
  startBuyNow: (
    product: Product,
    quantity?: number,
    selectedLength?: string | null,
    selectedColor?: ProductColor | null
  ) => void;
  checkoutCart: () => void;
  clear: () => void;
}

const STORAGE_KEY = "wigs_checkout";

interface StoredCheckoutState {
  source: CheckoutSource | null;
  buyNowItem: CheckoutItem | null;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  // Same hydration pattern as CartProvider: start empty on server + first
  // client render, then load storage in a microtask so nothing relying on
  // this context mismatches between server and client markup.
  const [source, setSource] = useState<CheckoutSource | null>(null);
  const [buyNowItem, setBuyNowItem] = useState<CheckoutItem | null>(null);
  const hasHydrated = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: StoredCheckoutState = saved
        ? JSON.parse(saved)
        : { source: null, buyNowItem: null };

      queueMicrotask(() => {
        hasHydrated.current = true;
        setSource(parsed.source ?? null);
        setBuyNowItem(parsed.buyNowItem ?? null);
      });
    } catch (error) {
      console.error("Failed to load checkout state from localStorage:", error);
      hasHydrated.current = true;
    }
  }, []);

  // Save to localStorage whenever checkout state changes
  useEffect(() => {
    if (!hasHydrated.current) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ source, buyNowItem })
      );
    } catch (error) {
      console.error("Failed to save checkout state to localStorage:", error);
    }
  }, [source, buyNowItem]);

  const startBuyNow = (
    product: Product,
    quantity: number = 1,
    selectedLength: string | null = null,
    selectedColor: ProductColor | null = null
  ) => {
    setSource("buy-now");
    setBuyNowItem({ ...product, quantity, selectedLength, selectedColor });
    router.push("/checkout");
  };

  const checkoutCart = () => {
    setSource("cart");
    setBuyNowItem(null); // cart flow never snapshots — it reads CartContext live
    router.push("/checkout");
  };

  const clear = () => {
    setSource(null);
    setBuyNowItem(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear checkout state from localStorage:", error);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{ source, buyNowItem, startBuyNow, checkoutCart, clear }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
