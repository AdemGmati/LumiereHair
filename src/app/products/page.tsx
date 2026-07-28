"use client";

import { useEffect, useState } from "react";
import { ShopCatalog } from "@/components/products/ShopCatalog";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types/product";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Server-rendered shop page. Product data remains in Supabase, never in the UI source. */
export default function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("products").select("*");

        if (!active) return;
        if (error) {
          setError(error.message);
          return;
        }

        setProducts((data ?? []) as Product[]);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load products");
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <main className="mx-auto max-w-300 px-5 py-16 text-center">
        <h1 className="font-display text-4xl font-semibold">
          {t("common.loading") as string}
        </h1>
        <p className="mt-2 text-[#796782]">
          {error}
        </p>
      </main>
    );
  }

  return (
    <>
      {/* Page Header & Breadcrumb Navigation */}
      <section className="border-b border-[#ebe6f1] bg-white py-8">
        <div className="mx-auto max-w-300 px-5">
          <nav className="mb-3 flex gap-2 text-[13px] text-[#796782]">
            <span>{t("products.page.breadcrumbHome") as string}</span>
            <span>/</span>
            <span>{t("products.page.breadcrumbShop") as string}</span>
          </nav>

          <h1 className="font-display text-4xl font-semibold leading-none tracking-tight md:text-[44px]">
            {t("products.page.title") as string}
          </h1>

          <p className="mt-2 max-w-[50ch] text-[#796782]">
            {t("products.page.description") as string}
          </p>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <ShopCatalog products={products} />
    </>
  );
}