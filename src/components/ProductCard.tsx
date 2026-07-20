'use client'

import Image from 'next/image';
import Link from "next/link";
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <Link href={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                {/* Image Container - Square Aspect Ratio */}
                <div className="relative w-full aspect-square bg-wigs-bg-alt overflow-hidden group">
                    <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="eager" 
                    />
                    
                    {/* Add to Cart Button - Positioned on Image */}
                    <button 
                        onClick={() => addToCart(product)}
                        className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg hover:bg-wigs-bg-alt transition"
                        aria-label="Add to cart"
                    >
                        <ShoppingBag size={20} className="text-wigs-primary" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-playfair text-lg text-wigs-text-primary mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-sm text-wigs-text-secondary mb-4 line-clamp-2 flex-1">
                        {product.description}
                    </p>

                    {/* Price */}
                    <div className="text-lg font-poppins font-semibold text-wigs-text-primary">
                        ${product.price.toFixed(2)} USD
                    </div>
                </div>
            </div>
        </Link>
    );
}
