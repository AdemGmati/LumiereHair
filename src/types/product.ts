export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category?: string | null;
  original_price?: number | null;
  rating?: number | string | null;
  reviews?: number | null;
  badge?: string | null;
  images?: string[] | null;
  lengths?: string[] | null;
  colors?: ProductColor[] | null;
  sku?: string | null;
}

export interface ProductColor {
  id: string;
  hex: string;
  label: string;
}
