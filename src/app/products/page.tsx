import { ShopCatalog } from "@/components/products/ShopCatalog";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

/** Server-rendered shop page. Product data remains in Supabase, never in the UI source. */
export default async function ProductsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select("*");

  // 3. Fallback error UI if data fetching fails
  if (error) {
    console.error("Unable to fetch products", error);

    return (
      <main className="mx-auto max-w-300 px-5 py-16 text-center">
        <h1 className="font-display text-4xl font-semibold">
          Unable to load products
        </h1>
        <p className="mt-2 text-[#796782]">
          Please try again shortly.
        </p>
      </main>
    );
  }

  // 4. Render header section and shop catalog view
  return (
    <>
      {/* Page Header & Breadcrumb Navigation */}
      <section className="border-b border-[#ebe6f1] bg-white py-8">
        <div className="mx-auto max-w-300 px-5">
          <nav className="mb-3 flex gap-2 text-[13px] text-[#796782]">
            <span>Home</span>
            <span>/</span>
            <span>Shop</span>
          </nav>

          <h1 className="font-display text-4xl font-semibold leading-none tracking-tight md:text-[44px]">
            Shop all extensions
          </h1>

          <p className="mt-2 max-w-[50ch] text-[#796782]">
            Clip-ins, ponytails, and tape wefts in luminous blonde tones —
            premium Remy human hair.
          </p>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <ShopCatalog products={(data ?? []) as Product[]} />
    </>
  );
}