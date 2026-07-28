"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

export function PromoBanner() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-300 px-5 pb-16">
      <div className="grid overflow-hidden rounded-[22px] bg-[#231132] text-white md:grid-cols-2">
        {/* Text Content */}
        <div className="flex min-h-80 flex-col justify-center p-8 sm:p-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
            {t("home.promo.eyebrow") as string}
          </p>

          <h2 className="font-display text-4xl font-semibold leading-none sm:text-5xl">
            {t("home.promo.title") as string}
          </h2>

          <p className="mt-4 max-w-md text-white/70">
            {t("home.promo.description") as string}
          </p>

          <Link
            href="/products"
            className="mt-7 w-fit rounded-full bg-violet-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[.06em] shadow-lg transition hover:bg-violet-700"
          >
            {t("home.hero.ctaPrimary") as string}
          </Link>
        </div>

        {/* Banner Image Container */}
        <div className="relative min-h-60">
          <Image
            src="/PromoBanner-image.png"
            alt={t("home.promo.imageAlt") as string}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
