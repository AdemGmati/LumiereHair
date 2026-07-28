"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ShoppingBag, Zap, Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductColors, getProductLengths } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Product, ProductColor } from "@/types/product";

interface ProductQuickViewProps {
  product: Product;
  trigger?: React.ReactElement;
}


export default function ProductQuickView({ product, trigger }: ProductQuickViewProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const lengths = getProductLengths(product);
  const colors = getProductColors(product);

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);



  const [selectedLength, setSelectedLength] = useState<string>(lengths[0] ?? '18"');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(colors[0] ?? null);

  const addProductToCart = () => {
    const resolvedLength = selectedLength || lengths[0] || '18"';
    const resolvedColor = selectedColor ?? colors[0] ?? { id: 'default', label: 'Standard', hex: '#e8dcc8' };

    for (let i = 0; i < quantity; i += 1) {
      addToCart(product, {
        selected_lenght: resolvedLength,
        selected_colors: resolvedColor.label,
      });
    }
  };

  const handleAddToCart = () => {
    addProductToCart();
    setOpen(false);
  };

  const handleBuyNow = () => {
    addProductToCart();
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600"
            />
          )
        }
      >
        {!trigger && (
          <>
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </>
        )}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "w-full max-w-[96vw] bg-white p-0 shadow-[0_30px_80px_rgba(124,58,237,0.15)] sm:max-w-275",
          "max-h-[90dvh] overflow-y-auto overscroll-contain"
        )}
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white lg:min-h-[520px] lg:grid-cols-[1.45fr_1.05fr]">
          <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-auto">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
            <div className="space-y-3">
              <DialogTitle className="text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
                {product.name}
              </DialogTitle>
              <p className="text-lg font-semibold text-purple-700">
                ${product.price.toFixed(2)}
              </p>
              <p className="max-w-prose text-sm leading-6 text-slate-600 sm:text-base">
                {product.description || 'A premium style with rich color and soft texture for everyday glam.'}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-purple-100 bg-purple-50/70 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-purple-700">Length</p>
                <div className="flex flex-wrap gap-2">
                  {lengths.map((length) => (
                    <button
                      key={length}
                      type="button"
                      onClick={() => setSelectedLength(length)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm font-medium transition',
                        selectedLength === length
                          ? 'border-transparent bg-purple-700 text-white shadow-sm'
                          : 'border-purple-200 bg-white text-purple-800 hover:border-purple-300'
                      )}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-purple-100 bg-purple-50/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-purple-700">Color</p>
                  <span className="text-sm font-medium text-purple-900">{selectedColor?.label ?? "Standard"}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={color.label}
                      aria-label={color.label}
                      className={cn(
                        'relative h-11 w-11 rounded-full transition focus:outline-none',
                        selectedColor?.id === color.id
                          ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-white'
                          : 'ring-1 ring-purple-200'
                      )}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor?.id === color.id && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-purple-100 bg-purple-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-purple-700">Quantity</p>
                <p className="text-sm text-purple-900">Choose how many</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-2 shadow-sm ring-1 ring-purple-100">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 text-purple-700 transition hover:border-purple-300 hover:bg-purple-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center text-sm font-semibold text-purple-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 text-purple-700 transition hover:border-purple-300 hover:bg-purple-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border-2 border-purple-700 bg-white px-6 py-3 text-sm font-semibold text-purple-800 transition hover:bg-purple-50 sm:w-auto"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-purple-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-600 sm:w-auto"
              >
                <Zap className="h-4 w-4" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
