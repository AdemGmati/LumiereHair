'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from "@/types/product";
import { useState } from 'react';

export default function AddToCart({ product }: { product: Product } ) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    addToCart(product);
    // Reset loading state after a brief moment
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="flex-1 border-2 border-wigs-primary text-wigs-primary py-3 px-6 rounded-full font-poppins font-semibold hover:bg-wigs-primary hover:text-white transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
    >
      <ShoppingBag size={20} />
      <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
    </button>
  );
}
