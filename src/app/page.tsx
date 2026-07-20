// Example: app/page.tsx or pages/index.tsx

import ProductCarousel from '@/components/ProductCarousel';
import Hero from '@/components/Hero';
import WhyWigsCastle from '@/components/WhyWigsCastle';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <Hero />
      {/* Featured Products Carousel */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="space-y-2 mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-wigs-text-primary">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Discover our latest arrivals and bestselling styles
            </p>
          </div>
        </div>
        <ProductCarousel />
      </section>

      {/* Other sections below */}
      <WhyWigsCastle />


      {/* Featured Products Carousel */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="space-y-2 mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-wigs-text-primary">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Discover our latest arrivals and bestselling styles
            </p>
          </div>
        </div>
        <ProductCarousel />
      </section>
      {/* ... */}
    </main>
  );
}
