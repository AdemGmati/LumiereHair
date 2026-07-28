'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Product } from "@/types/product";
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

interface BuyNowButtonProps {
  product: Product;
}

export default function BuyNowButton({ product }: BuyNowButtonProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { tStr, locale } = useLanguage();

  const handleBuyNow = () => {
    setIsLoading(true);
    addToCart(product);
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
      <span>{isLoading ? tStr('common.processing') : tStr('common.buyNow')}</span>
      <ArrowRight size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
    </button>
  );
}
