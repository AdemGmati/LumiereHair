import { createClient } from "@/lib/server";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, description, image_url");

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Failed to load products</div>;
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="font-playfair text-4xl mb-12">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}