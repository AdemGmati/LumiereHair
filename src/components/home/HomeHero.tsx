"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** The split hero keeps the editorial introduction and product imagery balanced. */
export function HomeHero() {
  const { t } = useLanguage();
  const promises = (t("home.hero.promises") as string[]) ?? [];
  return (
    <section className="mx-auto max-w-300 px-5 pt-5">
      <div className="grid min-h-115 overflow-hidden rounded-[22px] border bg-white shadow-[0_8px_30px_rgb(49_27_67/0.06)] md:grid-cols-[1.05fr_.95fr]">
        {/* Editorial / Text Content */}
        <div className="flex flex-col justify-center bg-[radial-gradient(ellipse_80%_70%_at_0%_100%,rgb(139_92_246/.1),transparent_60%),linear-gradient(165deg,#f8f8fc,#fff)] p-8 sm:p-12 lg:p-[3.75rem]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-500">
            {t("home.hero.eyebrow") as string}
          </p>

          <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
            {t("home.hero.title") as string}
          </h1>

          <p className="mt-4 max-w-[36ch] text-[1.02rem] text-[#796782]">
            {t("home.hero.description") as string}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-1.5">
                <Check className="size-4 text-violet-500" strokeWidth={2.5} />
                {promise}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-violet-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[.06em] text-white shadow-[0_8px_22px_rgb(139_92_246/.35)] transition hover:bg-violet-700"
            >
              {t("home.hero.ctaPrimary") as string}
            </Link>

            <Link
              href="/products"
              className="rounded-full border-[1.5px] border-[#311b43] px-6 py-3.5 text-xs font-semibold uppercase tracking-[.06em] transition hover:border-violet-500 hover:text-violet-500"
            >
              {t("home.hero.ctaSecondary") as string}
            </Link>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative min-h-70 bg-[#efe8ff]">
          <Image
            src="/hero-image.png"
            alt={t("home.hero.imageAlt") as string}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />

          <div className="absolute bottom-5 left-5 rounded-[14px] border border-white/60 bg-white/85 px-4 py-3 shadow-[0_8px_30px_rgb(49_27_67/.06)] backdrop-blur">
            <span className="block text-[11px] uppercase tracking-[.08em] text-[#796782]">
              {t("home.hero.priceLabel") as string}
            </span>
            <strong className="font-display text-xl font-semibold">$119</strong>
          </div>
        </div>
      </div>
    </section>
  );
}