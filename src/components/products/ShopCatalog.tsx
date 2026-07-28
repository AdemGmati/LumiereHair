"use client";

import { Filter, X } from "lucide-react";
import { useMemo, useState } from "react";
import { getProductCategory } from "@/lib/products";
import type { Product } from "@/types/product";
import { ProductTile } from "./ProductTile";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ShopCatalogProps {
  products: Product[];
}

/** Interactive client-side filters preserve server-fetched Supabase catalogue data. */
export function ShopCatalog({ products }: ShopCatalogProps) {
  const { t, locale } = useLanguage();
  // State for UI overlay, search, and active filter criteria
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [badge, setBadge] = useState("");
  const [sort, setSort] = useState("featured");

  // Dynamically extract up to 3 unique category choices from products
  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(products.map((product) => getProductCategory(product)))).slice(0, 3),
    [products]
  );

  // Compute filtered & sorted product list
  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        const text = `${product.name} ${product.description} ${getProductCategory(product)}`.toLowerCase();
        const matchesQuery = text.includes(query.toLowerCase());
        const matchesCategory =
          !categories.length || categories.includes(getProductCategory(product));
        const matchesPrice = product.price <= maxPrice;
        const matchesBadge =
          !badge || product.badge?.toLowerCase() === badge;

        return matchesQuery && matchesCategory && matchesPrice && matchesBadge;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "newest") return Number(b.badge === "new") - Number(a.badge === "new");
        return 0;
      });
  }, [products, query, categories, maxPrice, badge, sort]);

  // Handlers
  const clear = () => {
    setQuery("");
    setCategories([]);
    setMaxPrice(300);
    setBadge("");
    setSort("featured");
  };

  const toggleCategory = (category: string) => {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  return (
    <div className="mx-auto max-w-300 px-5">
      <div className="grid items-start gap-8 py-8 pb-16 lg:grid-cols-[260px_1fr]">
        {/* Mobile Filter Backdrop */}
        {filtersOpen && (
          <button
            className="fixed inset-0 z-60 bg-[#311b43]/40 lg:hidden"
            onClick={() => setFiltersOpen(false)}
            aria-label={t("common.closeMenu") as string}
          />
        )}

        {/* Sidebar Filters */}
        <aside
          className={`fixed inset-y-0 start-0 z-70 w-[min(320px,90vw)] overflow-y-auto border-e border-[#ebe6f1] bg-white p-5 shadow-[0_18px_50px_rgb(49_27_67/0.1)] transition-transform lg:sticky lg:top-36 lg:z-0 lg:w-auto lg:translate-x-0 lg:rounded-2xl lg:border lg:shadow-none ${
            filtersOpen ? "translate-x-0" : locale === "ar" ? "translate-x-full" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-[13px] font-bold uppercase tracking-[.08em]">
              {t("products.catalog.filters") as string}
            </h2>
            <button
              className="grid size-10 place-items-center lg:hidden"
              onClick={() => setFiltersOpen(false)}
              aria-label={t("common.closeMenu") as string}
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="border-t border-[#ebe6f1] py-4">
            <h3 className="mb-3 text-[13px] font-semibold">{t("products.catalog.category") as string}</h3>
            {categoryOptions.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2 py-1.5 text-sm text-[#796782]"
              >
                <input
                  type="checkbox"
                  checked={categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="size-4 accent-violet-500"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="border-t border-[#ebe6f1] py-4">
            <h3 className="mb-3 text-[13px] font-semibold">{t("products.catalog.price") as string}</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="0"
                value="0"
                readOnly
                className="rounded-[10px] border border-[#ebe6f1] bg-[#f8f8fc] p-2 text-xs font-mono"
              />
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value) || 0)
                }
                className="rounded-[10px] border border-[#ebe6f1] bg-[#f8f8fc] p-2 text-xs font-mono"
              />
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="mt-3 w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-[#796782]">
              <span>$0</span>
              <span>${maxPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Offer Badges Filter */}
          <div className="border-t border-[#ebe6f1] py-4">
            <h3 className="mb-3 text-[13px] font-semibold">{t("products.catalog.offers") as string}</h3>
            {[
              ["", t("products.catalog.allOffers") as string],
              ["new", t("products.catalog.newArrivals") as string],
              ["sale", t("products.catalog.onSale") as string],
              ["bestseller", t("products.catalog.bestsellers") as string],
            ].map(([value, label]) => (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-2 py-1.5 text-sm text-[#796782]"
              >
                <input
                  type="radio"
                  name="offer"
                  value={value}
                  checked={badge === value}
                  onChange={() => setBadge(value)}
                  className="size-4 accent-violet-500"
                />
                {label}
              </label>
            ))}
          </div>

          {/* Reset Action */}
          <button
            onClick={clear}
            className="mt-3 min-h-10 w-full rounded-full border border-[#ebe6f1] text-xs font-semibold uppercase tracking-[.06em] transition hover:border-violet-400 hover:text-violet-600"
          >
            {t("products.catalog.clearAll") as string}
          </button>
        </aside>

        {/* Main Grid Section */}
        <div>
          {/* Controls Bar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#796782]">
              <strong className="text-[#311b43]">{filtered.length}</strong>{" "}
              {t("products.catalog.productsCount") as string}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex min-h-10.5 items-center gap-2 rounded-full border border-[#ebe6f1] px-4 text-[13px] font-semibold lg:hidden"
              >
                <Filter className="size-4" />
                {t("products.catalog.filters") as string}
              </button>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("products.catalog.searchPlaceholder") as string}
                className="min-h-10.5 rounded-full border border-[#ebe6f1] bg-white px-4 text-[13px] outline-none focus:border-violet-400"
              />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="min-h-10.5 rounded-full border border-[#ebe6f1] bg-white px-4 text-[13px] outline-none focus:border-violet-400"
              >
                <option value="featured">{t("products.catalog.featured") as string}</option>
                <option value="newest">{t("products.catalog.newest") as string}</option>
                <option value="price-asc">{t("products.catalog.priceAsc") as string}</option>
                <option value="price-desc">{t("products.catalog.priceDesc") as string}</option>
              </select>
            </div>
          </div>

          {/* Products Results Grid or Empty Fallback */}
          {filtered.length ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[#796782]">
              <h2 className="font-display text-3xl font-semibold text-[#311b43]">
                {t("products.catalog.noMatches") as string}
              </h2>
              <p>{t("products.catalog.tryAdjusting") as string}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
