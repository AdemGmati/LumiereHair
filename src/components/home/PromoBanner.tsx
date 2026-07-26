import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-300 px-5 pb-16">
      <div className="grid overflow-hidden rounded-[22px] bg-[#231132] text-white md:grid-cols-2">
        {/* Text Content */}
        <div className="flex min-h-80 flex-col justify-center p-8 sm:p-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
            Limited offer
          </p>

          <h2 className="font-display text-4xl font-semibold leading-none sm:text-5xl">
            Unlock your true beauty
          </h2>

          <p className="mt-4 max-w-md text-white/70">
            15% off curly & wave pieces with code{" "}
            <strong className="font-semibold text-violet-300">CURVE15</strong>.
            Luxury hair, ready for every moment.
          </p>

          <Link
            href="/products"
            className="mt-7 w-fit rounded-full bg-violet-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[.06em] shadow-lg transition hover:bg-violet-700"
          >
            Shop now
          </Link>
        </div>

        {/* Banner Image Container */}
        <div className="relative min-h-60">
          <Image
            src="/PromoBanner-image.png"
            alt="Blonde hair extension bundle"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
