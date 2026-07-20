'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types/product';

export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(12);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1536) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const maxIndex = Math.max(0, products.length - itemsPerView);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;

  if (isLoading) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-wigs-text-primary">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Container */}
        <div className="relative">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-16 md:-translate-x-20 z-10 p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6 text-wigs-text-primary" />
          </button>

          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-16 md:translate-x-20 z-10 p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6 text-wigs-text-primary" />
          </button>

          {/* Products Grid */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div
              className="flex gap-6 md:gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`,
                  }}
                >
                  <div className="group cursor-pointer">
                    
                    {/* Product Image Container */}
                    <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Lock/Cart Icon */}
                      <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                        <Lock className="w-5 h-5 text-wigs-text-primary" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="font-poppins text-sm md:text-base text-wigs-text-primary line-clamp-2 group-hover:text-wigs-primary transition">
                        {product.name}
                      </h3>
                      <p className="font-poppins font-semibold text-base md:text-lg text-wigs-text-primary">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="bg-linear-to-r from-wigs-primary to-wigs-primary-dark text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-opacity-90 transition"
          >
            View all
          </Link>
        </div>

      </div>
    </section>
  );
}
