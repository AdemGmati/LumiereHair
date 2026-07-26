import Link from "next/link";
import { ProductDetailsView } from "@/components/products/ProductDetailsView";
import { ProductTile } from "@/components/products/ProductTile";
import { getProductCategory } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

/** Dynamic Supabase product page with an interactive gallery and purchase controls. */
export default async function ProductDetailsPage({
  params,
}: PageProps<"/products/[id]">) {
  // 1. Extract route params and initialize Supabase client
  const { id } = await params;
  const supabase = await createClient();

  // 2. Fetch the primary product by ID
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const product = data as Product | null;

  // 3. Fallback UI if the product doesn't exist or fetch fails
  if (error || !product) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#fdfbfe] px-5 text-center">
        <div>
          <h1 className="font-display text-4xl font-semibold">
            Product not found
          </h1>
          <p className="mt-2 text-[#796782]">
            Sorry, we couldn&apos;t find this product.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-violet-500 px-6 text-sm font-semibold text-white"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  // 4. Fetch additional products to display as recommendations
  const { data: allProducts } = await supabase
    .from("products")
    .select("*")
    .neq("id", id)
    .limit(12);

  const catalogue = (allProducts ?? []) as Product[];

  // 5. Filter for related products by category (fallback to general list if no matches)
  const related = catalogue
    .filter((item) => getProductCategory(item) === getProductCategory(product))
    .slice(0, 4);

  const displayRelated = related.length ? related : catalogue.slice(0, 4);

  // 6. Render main product view + related products grid
  return (
    <>
      <ProductDetailsView product={product} />

      <section className="mx-auto max-w-300 px-5 pb-16">
        {/* Section Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-500">
              Complete the look
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Related products
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-violet-500 hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* Related Products Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {displayRelated.map((item) => (
            <ProductTile key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}