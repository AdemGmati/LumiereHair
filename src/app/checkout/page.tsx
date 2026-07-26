"use client";

/**
 * Checkout — Shipping step. Suggested location: app/checkout/page.tsx
 *
 * Items now come from CheckoutContext:
 *   - source === "buy-now"          → the single snapshot item from Product Details
 *   - source === "cart" / no source → live cartItems from CartContext
 *
 * Wire handleContinue() to your order logic before payment.
 */

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Ruler, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckout, type CheckoutItem } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext"; // adjust to wherever your CartContext lives

const FREE_SHIPPING_THRESHOLD = 150;
const TAX_RATE = 0.08;
const inputClass =
  "rounded-xl border-[#e5e0f0] focus-visible:border-[#8b5cf6] focus-visible:ring-[#8b5cf6]/20";

type FieldName = "firstName" | "lastName" | "email" | "phone" | "city" | "state" | "zip";

const FIELDS: { name: FieldName; label: string; placeholder: string; type?: string }[] = [
  { name: "firstName", label: "First Name", placeholder: "Divyansh" },
  { name: "lastName", label: "Last Name", placeholder: "Agarwal" },
  { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { name: "phone", label: "Phone Number", placeholder: "+1 555 123 4567", type: "tel" },
  { name: "city", label: "City", placeholder: "Bangalore" },
  { name: "state", label: "State", placeholder: "Karnataka" },
  { name: "zip", label: "Zip Code", placeholder: "560021" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { source, buyNowItem } = useCheckout();
  const { cartItems } = useCart();

  // Buy-now checkouts use the single snapshot item taken from the product
  // page. Everything else — including a plain refresh with no explicit
  // source — falls back to whatever's live in the cart.
  const items: CheckoutItem[] =
    source === "buy-now" && buyNowItem ? [buyNowItem] : cartItems;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
  });

  const updateField =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12.99;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handleContinue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/checkout/payment");
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8f6fc] px-4 text-center">
        <p className="font-display text-2xl text-[#2d1b4e]">Your checkout is empty</p>
        <p className="text-sm text-[#6b5280]">
          Add something to your cart or hit Buy Now on a product to get started.
        </p>
        <Link
          href="/products"
          className="rounded-full bg-[#2d1b4e] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#241640]"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
          <Link href="/cart" className="text-[#6b5280] hover:text-[#8b5cf6]">
            Cart
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#6b5280]/40" />
          <span className="text-[#8b5cf6]">Shipping</span>
          <ChevronRight className="h-3.5 w-3.5 text-[#6b5280]/40" />
          <span className="text-[#6b5280]/50">Payment</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={handleContinue}
            className="rounded-[28px] border border-[#efeaf9] bg-white p-6 shadow-[0_8px_30px_-12px_rgba(139,92,246,0.18)] sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[#8b5cf6]">
              Checkout
            </p>
            <h1 className="mt-1 font-display text-2xl text-[#2d1b4e] sm:text-3xl">
              Shipping Address
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <Field key={field.name} label={field.label}>
                  <Input
                    required
                    type={field.type ?? "text"}
                    value={form[field.name]}
                    onChange={updateField(field.name)}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                </Field>
              ))}
            </div>
          </form>

          <aside className="h-fit rounded-[28px] border border-[#efeaf9] bg-white p-6 shadow-[0_8px_30px_-12px_rgba(139,92,246,0.18)] lg:sticky lg:top-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl text-[#2d1b4e]">
                Your Cart{" "}
                <span className="font-body text-sm font-normal text-[#6b5280]">
                  ({itemCount})
                </span>
              </h2>
            </div>

            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#f8f6fc]">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#8b5cf6] text-[11px] font-semibold text-white ring-2 ring-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#2d1b4e]">
                      {item.name}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {item.selectedColor && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e0f0] px-2 py-1 text-[11px] text-[#2d1b4e]">
                          <span
                            className="h-3 w-3 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.label}
                        </span>
                      )}
                      {item.selectedLength && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#e5e0f0] px-2 py-1 text-[11px] text-[#2d1b4e]">
                          <Ruler className="h-3 w-3 text-[#8b5cf6]" />
                          {item.selectedLength}
                        </span>
                      )}
                    </div>
                    {item.sku && (
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-[#6b5280]/70">
                        SKU · {item.sku}
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-[#2d1b4e]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="my-5 h-px bg-[#efeaf9]" />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#6b5280]">Subtotal</dt>
                <dd className="text-[#2d1b4e]">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6b5280]">Shipping</dt>
                <dd className="text-[#2d1b4e]">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-[#6b5280]">
                  Estimated tax
                  <Info className="h-3.5 w-3.5" />
                </dt>
                <dd className="text-[#2d1b4e]">${tax.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="my-4 h-px bg-[#efeaf9]" />

            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg text-[#2d1b4e]">Total</span>
              <span className="font-display text-3xl text-[#2d1b4e]">
                ${total.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handleContinue}
              className="mt-6 w-full rounded-2xl bg-[#2d1b4e] py-6 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#241640]"
            >
              Continue to Payment
            </Button>

            <p className="mt-5 flex items-center gap-1.5 border-t border-[#efeaf9] pt-4 text-xs text-[#6b5280]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#8b5cf6]" />
              Free shipping over ${FREE_SHIPPING_THRESHOLD} · Secure checkout
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-bold uppercase tracking-wide text-[#2d1b4e]">
        {label} <span className="text-[#8b5cf6]">*</span>
      </Label>
      {children}
    </div>
  );
}
