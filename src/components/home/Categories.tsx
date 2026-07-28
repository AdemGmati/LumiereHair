"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

const categoryImages = ["/Categorie-1.png", "/Categorie-2.png", "/Categorie-3.png", "/Categorie-4.png"] as const;

export function Categories() {
  const { t } = useLanguage();
  const categories = ((t("home.categories.items") as string[]) ?? []).map((name, index) => [name, "/products", categoryImages[index]] as const);
  return (
    <section className="mx-auto max-w-300 px-5 pb-16 pt-6">
      <SectionHeading eyebrow={t("home.categories.eyebrow") as string} title={t("home.categories.title") as string} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map(([name, href, image]) => (
          <Link
            key={name}
            href={href}
            className="group relative aspect-4/5 overflow-hidden rounded-[18px] border bg-[#f8f8fc] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgb(49_27_67/.1)]"
          >
            <Image
              src={image}
              alt={`${name} ${t("home.categories.imageAlt") as string}`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#24132f]/75 via-transparent to-transparent" />

            <span className="absolute inset-x-0 bottom-0 p-5 text-white">
              <strong className="block font-display text-[1.65rem] font-semibold">
                {name}
              </strong>
              <small className="text-xs font-semibold uppercase tracking-[.08em]">
                {t("home.categories.shopNow") as string}
              </small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}