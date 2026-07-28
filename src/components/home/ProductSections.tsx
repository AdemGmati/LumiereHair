"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products';
import { SectionHeading } from "./SectionHeading";
import  ProductQuickView  from "@/components/home/ProductQuickView";


function ProductCard({ product }: { product: Product }) {

  return (
    <article className="group flex overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-0.5 hover:border-violet-300/50 hover:shadow-[0_8px_30px_rgb(49_27_67/.06)]">
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Image & Badges */}
        <Link className="relative aspect-square overflow-hidden bg-linear-to-b from-[#f4f1fa] to-[#ebe6f5]"
          href={`/products/${product.id}`}>
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
          />

          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-white ${product.badge === "Sale" ? "bg-[#311b43]" : "bg-violet-500"
                }`}
            >
              {product.badge}
            </span>
          )}

          <button
            aria-label={`Save ${product.name}`}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-[#796782] opacity-100 shadow-sm transition hover:text-violet-500 md:opacity-0 md:group-hover:opacity-100"
          >
            <Heart className="size-4" />
          </button>
        </Link>

        {/* Product Details */}
        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[.08em] text-[#796782]">
            {product.category}
          </p>

          <Link
            href={`/products/${product.id}`}
            className="mt-1 text-sm font-semibold leading-[1.35] hover:text-violet-500"
          >
            {product.name}
          </Link>


          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <span className="font-mono text-sm font-medium">
              ${product.price}
              {product.original_price && (
                <del className="ml-1.5 font-body text-xs font-normal text-[#796782]">
                  ${product.original_price}
                </del>
              )}
            </span>

            <ProductQuickView
              product={product}
              trigger={
                <button
                  aria-label={`Add ${product.name} to bag`}
                  className="grid size-9.5 place-items-center rounded-full border bg-[#f8f8fc] transition hover:border-violet-500 hover:bg-violet-500 hover:text-white"
                >
                  <Plus className="size-4" />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function Grid({ list }: { list: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-[1.15rem] lg:grid-cols-4">
      {list.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

/** Product data stays local for a fast, complete storefront presentation before catalog data loads. */
export function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="mx-auto max-w-300 px-5 pb-16">
        <SectionHeading eyebrow="Curated" title="Featured products" />
        <Grid list={products.slice(0, 4)} />
      </section>

      <section className="mx-auto max-w-300 px-5 pb-16">
        <SectionHeading eyebrow="Most loved" title="Best sellers" />
        <Grid list={[products[0], products[3], products[6]].filter(Boolean)} />
      </section>

      <section className="mx-auto max-w-300 px-5 pb-16">
        <SectionHeading eyebrow="Just in" title="New & on sale" />
        <Grid
          list={products.filter(
            (p) => p.badge === "New" || p.badge === "Sale"
          )}
        />
      </section>
    </>
  );
}