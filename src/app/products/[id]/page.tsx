import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { useCart } from '@/context/CartContext';
import AddToCart from '@/components/cart/AddToCart'

interface ProductDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetails ({ params }: ProductDetailsProps) {
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
        <h1 className="font-playfair text-4xl mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find this product.</p>
        <Link 
          href="/products"
          className="bg-wigs-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-wigs-bg-alt">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Back Button */}
        <Link 
          href="/products"
          className="text-wigs-primary hover:underline mb-8 inline-block"
        >
          ← Back to Products
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <Image
              src={product.image_url}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              loading="eager"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-playfair text-5xl text-wigs-text-primary mb-4">
              {product.name}
            </h1>

            <div className="border-b-2 border-wigs-secondary mb-6 pb-6">
              {product.price && (
                <p className="text-3xl font-bold text-wigs-secondary mb-2">
                  ${product.price}
                </p>
              )}
            </div>

            <div className="mb-8">
              <h2 className="font-playfair text-2xl text-wigs-text-primary mb-3">
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <AddToCart  product={product} />
              <button className="flex-1 border-2 border-wigs-primary text-wigs-primary py-3 rounded-md font-poppins font-semibold hover:bg-wigs-primary hover:text-white transition">
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            {product.sku && (
              <div className="mt-8 pt-8 border-t border-gray-300">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">SKU:</span> {product.sku}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}