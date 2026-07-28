"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductDetailsView } from "@/components/products/ProductDetailsView";
import { ProductTile } from "@/components/products/ProductTile";
import { getProductCategory } from "@/lib/products";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types/product";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Dynamic Supabase product page with an interactive gallery and purchase controls. */
export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [catalogue, setCatalogue] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const { id } = await params;
      const supabase = createClient();
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (!active) return;
      if (error || !data) {
        setProduct(null);
        setIsLoading(false);
        return;
      }

      const { data: allProducts } = await supabase.from("products").select("*").neq("id", id).limit(12);
      if (!active) return;
      setProduct(data as Product);
      setCatalogue((allProducts ?? []) as Product[]);
      setIsLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [params]);

  if (isLoading) {
    return <main className="min-h-[60vh] px-5 py-16 text-center">{t("common.loading") as string}</main>;
  }

  if (!product) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#fdfbfe] px-5 text-center">
        <div>
          <h1 className="font-display text-4xl font-semibold">
            {t("products.details.productNotFound") as string}
          </h1>
          <p className="mt-2 text-[#796782]">
            {t("products.details.productMissing") as string}
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-violet-500 px-6 text-sm font-semibold text-white"
          >
            {t("common.backToProducts") as string}
          </Link>
        </div>
      </main>
    );
  }

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
              {t("products.details.completeTheLook") as string}
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {t("products.details.related") as string}
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-violet-500 hover:underline"
          >
            {t("products.details.viewAll") as string} →
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