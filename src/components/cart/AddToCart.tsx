'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCart({ product }: any ) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="flex-1 bg-wigs-primary text-white py-3 rounded-md font-poppins font-semibold hover:bg-opacity-90 transition"
    >
      Add to Cart
    </button>
  );
}