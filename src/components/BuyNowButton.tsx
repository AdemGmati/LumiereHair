'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Product } from "@/types/product";
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface BuyNowButtonProps {
  productId: string;
  product: Product;
}

export default function BuyNowButton({ productId, product }: BuyNowButtonProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = () => {
    setIsLoading(true);
    
    // Add product to cart
    addToCart(product);
    
    // Navigate to checkout
    setTimeout(() => {
      router.push('/checkout');
    }, 300);
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={isLoading}
      className="flex-1 bg-wigs-primary text-white py-3 px-6 rounded-full font-poppins font-semibold hover:bg-opacity-90 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
    >
      <span>{isLoading ? 'Processing...' : 'Buy Now'}</span>
      <ArrowRight size={20} />
    </button>
  );
}
