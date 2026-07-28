import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

// Public page — anyone can land here, logged in or not.
//
// NOTE on Next.js versions: in Next.js 15+, `searchParams` is a Promise and
// this component needs to be `async` with `const { order } = await searchParams;`.
// On Next.js 13/14, the synchronous version below is correct as-is.
export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const orderId = searchParams?.order;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8f6fc] px-4 text-center">
      <CheckCircle2 className="h-14 w-14 text-[#8b5cf6]" />
      <h1 className="font-display text-2xl text-[#2d1b4e] sm:text-3xl">
        Thanks — your order is in!
      </h1>

      {orderId ? (
        <p className="text-sm text-[#6b5280]">
          Order reference: <span className="font-semibold text-[#2d1b4e]">#{orderId}</span>
        </p>
      ) : null}

      <p className="max-w-md text-sm text-[#6b5280]">
        No account needed — you&apos;re all set. Keep an eye on the email you gave us for
        updates on your order.
      </p>

      <Link
        href="/products"
        className="mt-2 rounded-full bg-[#2d1b4e] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#241640]"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
