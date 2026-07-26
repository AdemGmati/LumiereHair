import type { Product, ProductColor } from "@/types/product";
import { createClient } from '@/lib/supabase/client';

// ============================================================================
// Product Metadata Normalization Helpers
// ============================================================================

// lib/products.ts


export async function getProducts() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*');

    console.log("data:", data);
    console.log("error:", error);

  if (error) throw error;

  return data;
}


/**
 * Normalizes optional product metadata while keeping the Supabase schema flexible.
 * Returns the product category or defaults to "Extensions".
 */
export function getProductCategory(product: Product): string {
  return product.category?.trim() || "Extensions";
}

/**
 * Ensures a fallback array of image URLs exists.
 * Filters empty items from gallery images, falling back to primary `image_url`.
 */
export function getProductImages(product: Product): string[] {
  const gallery = product.images?.filter(Boolean) ?? [];
  return gallery.length > 0 ? gallery : [product.image_url];
}

/**
 * Supplies usable detail controls when optional length metadata is absent.
 * Defaults to a standard 18" option.
 */
export function getProductLengths(product: Product): string[] {
  return product.lengths?.length ? product.lengths : ['18"'];
}

/**
 * Supplies a neutral, accessible color option when a product has no color metadata.
 */
export function getProductColors(product: Product): ProductColor[] {
  return product.colors?.length
    ? product.colors
    : [{ id: "default", label: "Standard", hex: "#e8dcc8" }];
}

// ============================================================================
// Formatting Helpers
// ============================================================================

/**
 * Formats a raw numerical price into USD currency format (e.g., $19.99).
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}