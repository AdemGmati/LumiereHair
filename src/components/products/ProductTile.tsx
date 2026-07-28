"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  formatPrice,
  getProductCategory,
  getProductColors,
  getProductLengths,
} from "@/lib/products";
import type { Product } from "@/types/product";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ProductTileProps {
  product: Product;
}

function getBadgeLabel(badge: string, tStr: (path: string) => string): string {
  const key = badge.toLowerCase();
  if (key === "sale") return tStr("badges.sale");
  if (key === "new") return tStr("badges.new");
  if (key === "bestseller") return tStr("badges.bestseller");
  return badge;
}

/** Responsive catalogue card used on the shop and related-products sections. */
export function ProductTile({ product }: ProductTileProps) {
  const { addToCart } = useCart();
  const { locale, tStr } = useLanguage();
  const [saved, setSaved] = useState(false);

  const badge = product.badge?.toLowerCase();
  const lengths = getProductLengths(product);
  const colors = getProductColors(product, locale);
  const defaultLength = lengths[0];
  const defaultColor = colors[0]?.label ?? tStr("common.standard");

  return (
    <article className="group overflow-hidden rounded-[14px] border border-[#ebe6f1] bg-white shadow-[0_8px_30px_rgb(49_27_67/0.06)] transition-shadow hover:shadow-[0_18px_50px_rgb(49_27_67/0.1)]">
      <div className="relative aspect-square overflow-hidden bg-[#f8f8fc]">
        <Link
          href={`/products/${product.id}`}
          className="block size-full"
          aria-label={tStr("common.viewProduct", { name: product.name })}
        >
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {badge && (
          <span
            className={`absolute start-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${
              badge === "sale"
                ? "bg-rose-100 text-rose-700"
                : badge === "new"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-[#311b43] text-white"
            }`}
          >
            {getBadgeLabel(badge, tStr)}
          </span>
        )}

        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-label={tStr("common.saveProduct", { name: product.name })}
          className={`absolute end-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 transition hover:text-violet-500 ${
            saved ? "text-violet-500" : "text-[#311b43]"
          }`}
        >
          <Heart className={`size-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-violet-500">
          {getProductCategory(product, locale)}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="block min-h-11 text-[15px] font-semibold leading-snug text-[#311b43] hover:text-violet-500"
        >
          {product.name}
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="font-mono text-sm font-medium text-[#311b43]">
            {formatPrice(product.price, locale)}{" "}
            {product.original_price ? (
              <span className="ms-1 text-xs text-[#796782] line-through">
                {formatPrice(product.original_price, locale)}
              </span>
            ) : null}
          </p>

          <button
            type="button"
            onClick={() =>
              addToCart(product, {
                selected_lenght: defaultLength,
                selected_colors: defaultColor,
              })
            }
            className="grid size-9 place-items-center rounded-full border border-[#ebe6f1] transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600"
            aria-label={tStr("common.addProductToBag", { name: product.name })}
          >
            <ShoppingCart className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
