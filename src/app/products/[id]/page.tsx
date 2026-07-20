import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import AddToCart from '@/components/cart/AddToCart';
import BuyNowButton from '@/components/BuyNowButton';

interface ProductDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wigs-bg-alt">
        <h1 className="font-playfair text-4xl mb-4 text-wigs-text-primary">Product Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find this product.</p>
        <Link 
          href="/products"
          className="bg-wigs-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-wigs-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-12 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-wigs-primary transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-wigs-primary transition">Products</Link>
          <span>/</span>
          <span className="text-wigs-text-primary font-medium">{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={product.image_url}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              loading="eager"
              priority
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            
            {/* Title */}
            <h1 className="font-playfair text-4xl sm:text-5xl text-wigs-text-primary mb-4">
              {product.name}
            </h1>

            {/* Rating Section */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < 4 ? 'fill-yellow-400 text-yellow-400' : i === 4 ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.5 stars) • 15 reviews</span>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Price</p>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-playfair text-wigs-primary">
                  ${product.price}
                </p>
                {product.original_price && (
                  <p className="text-lg text-gray-400 line-through">
                    ${product.original_price}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-2">Tax included. Shipping calculated at checkout.</p>
            </div>

            {/* Description Section */}
            <div className="mb-10">
              <h2 className="font-playfair text-xl text-wigs-text-primary mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <AddToCart product={product} />
              <BuyNowButton productId={product.id} product={product} />
            </div>

            {/* Trust Signals */}
            <div className="pt-8 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ShoppingBag size={16} className="text-wigs-secondary" />
                <span>Free Shipping Worldwide</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Heart size={16} className="text-wigs-secondary" />
                <span>Lifetime Color Warranty</span>
              </div>
            </div>

            {/* SKU Info */}
            {product.sku && (
              <div className="mt-6 text-xs text-gray-500">
                <span className="font-semibold">SKU:</span> {product.sku}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
