"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  formatPrice,
  getProductCategory,
  getProductColors,
  getProductImages,
  getProductLengths,
} from "@/lib/products";
import type { Product } from "@/types/product";

interface ProductDetailsViewProps {
  product: Product;
}

/** Product gallery and purchase controls; server data is passed in to keep interactions client-only. */
export function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  // Helper selectors
  const images = getProductImages(product);
  const lengths = getProductLengths(product);
  const colors = getProductColors(product);

  // Component state
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(lengths[0]);
  const [color, setColor] = useState(colors[0]);

  // Handlers
  const addQuantity = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(product, {
        selected_lenght: length,
        selected_colors: color.label,
      });
    }
  };

  return (
    <main className="mx-auto max-w-300 px-5 py-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex flex-wrap gap-2 text-[13px] text-[#796782]">
        <Link href="/" className="hover:text-violet-500">
          {t("products.details.home") as string}
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-violet-500">
          {t("products.details.shop") as string}
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-violet-500">
          {getProductCategory(product)}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid items-start gap-10 md:grid-cols-[1.1fr_.9fr]">
        {/* Left Column: Image Gallery & Viewer */}
        <section className="grid grid-cols-1 gap-3 lg:grid-cols-[72px_1fr]">
          {/* Thumbnails */}
          <div className="order-2 flex gap-2 lg:order-0 lg:flex-col">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => {
                  setImageIndex(index);
                  setZoomed(false);
                }}
                className={`relative aspect-square w-17 shrink-0 overflow-hidden rounded-xl border-[1.5px] bg-[#f8f8fc] ${imageIndex === index
                    ? "border-violet-500"
                    : "border-[#ebe6f1]"
                  }`}
                aria-label={`${t("common.viewProduct") as string} ${index + 1}`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="68px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <button
            onClick={() => setZoomed((value) => !value)}
            className="relative aspect-square overflow-hidden rounded-[18px] border border-[#ebe6f1] bg-linear-to-b from-[#f6f3fb] to-[#ebe5f5]"
            title={t("products.details.clickToZoom") as string}
          >
            <Image
              src={images[imageIndex]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className={`object-contain p-6 transition-transform duration-300 ${zoomed ? "scale-150" : ""
                }`}
            />
          </button>
        </section>

        {/* Right Column: Product Details & Controls */}
        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-500">
            {getProductCategory(product)}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
            {product.name}
          </h1>

          {/* Price Block */}
          <div className="my-4 flex items-baseline gap-3">
            <span className="font-mono text-2xl font-medium">
              {formatPrice(product.price)}
            </span>
            {product.original_price ? (
              <span className="text-sm text-[#796782] line-through">
                {formatPrice(product.original_price)}
              </span>
            ) : null}
          </div>

          <p className="mb-6 max-w-[48ch] text-[15px] leading-relaxed text-[#796782]">
            {product.description}
          </p>

          {/* Option: Length Selector */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[.08em]">
              {t("products.details.length") as string}{" "}
              <span className="normal-case font-normal tracking-normal text-[#796782]">
                {length}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {lengths.map((item) => (
                <button
                  key={item}
                  onClick={() => setLength(item)}
                  className={`min-h-10.5 rounded-full border-[1.5px] px-4 text-[13px] font-medium ${length === item
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-[#ebe6f1]"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Option: Color Swatches */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[.08em]">
              {t("products.details.color") as string}{" "}
              <span className="normal-case font-normal tracking-normal text-[#796782]">
                {color.label}
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              {colors.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setColor(item)}
                  title={item.label}
                  aria-label={item.label}
                  className={`size-9 rounded-full border-2 border-white ${color.id === item.id
                      ? "ring-2 ring-violet-500"
                      : "ring-1 ring-[#ebe6f1]"
                    }`}
                  style={{ backgroundColor: item.hex }}
                />
              ))}
            </div>
          </div>

          {/* Option: Quantity Stepper & Stock */}
          <div className="mb-5 flex items-center gap-3">
            <div className="inline-flex overflow-hidden rounded-full border border-[#ebe6f1]">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="grid size-11 place-items-center hover:bg-[#f8f8fc]"
                aria-label={t("common.decreaseQuantity") as string}
              >
                <Minus className="size-4" />
              </button>
              <span className="grid min-w-9 place-items-center font-mono text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                className="grid size-11 place-items-center hover:bg-[#f8f8fc]"
                aria-label={t("common.increaseQuantity") as string}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <span className="text-[13px] text-[#796782]">
              {t("products.details.inStock") as string}
            </span>
          </div>

          {/* CTA Action Buttons */}
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={addQuantity}
              className="min-h-12 rounded-full bg-violet-500 px-6 text-[13px] font-semibold uppercase tracking-[.06em] text-white shadow-[0_8px_22px_rgb(139_92_246/0.35)] transition hover:bg-violet-700"
            >
              {t("common.addToBag") as string}
            </button>
            <button
              onClick={() => {
                addQuantity();
                router.push("/checkout");
              }}
              className="min-h-12 rounded-full bg-[#311b43] px-6 text-[13px] font-semibold uppercase tracking-[.06em] text-white transition hover:bg-violet-700"
            >
              {t("common.buyNow") as string}
            </button>
          </div>

          {/* Value Highlights */}
          <ul className="space-y-2 border-t border-[#ebe6f1] pt-4 text-[13px] text-[#796782]">
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-violet-500" />
              {t("products.details.valueHighlights.0") as string}
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-violet-500" />
              {t("products.details.valueHighlights.1") as string}
            </li>
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-violet-500" />
              {t("products.details.valueHighlights.2") as string}
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
