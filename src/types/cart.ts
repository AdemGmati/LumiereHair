import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
  selected_lenght: string;
  selected_colors: string;
}