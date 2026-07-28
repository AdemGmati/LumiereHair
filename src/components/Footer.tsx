"use client";

import Link from "next/link";
import { Circle, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const groups = [
    [t("footer.shopTitle") as string, t("footer.shopItems") as string[], ["/products", "/products?cat=clip-ins", "/products?cat=ponytails", "/products?cat=tape"]],
    [t("footer.companyTitle") as string, t("footer.companyItems") as string[], ["/", "/", "/", "/user/center"]],
    [t("footer.helpTitle") as string, t("footer.helpItems") as string[], ["/", "/", "/", "/"]],
  ] as const;

  return (
    <footer className="mt-8 bg-[#1a1028] px-5 pb-6 pt-14 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold">Lumière Hair</Link>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/65">
              {t("footer.description") as string}
            </p>
            <div className="mt-5 flex gap-2">
              {[Circle, Heart, Sparkles].map((Icon, index) => (
                <a href="#" key={index} aria-label={t("common.socialMedia") as string} className="grid size-9 place-items-center rounded-full border border-white/15 hover:bg-violet-500">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {groups.map(([title, items, links]) => (
            <div key={title}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[.1em]">{title}</h2>
              {items.map((item, index) => (
                <Link key={item} href={links[index]} className="block py-1.5 text-sm text-white/65 hover:text-violet-300">
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/50">
          <span>{t("footer.copyright") as string}</span>
          <span>{t("footer.tagline") as string}</span>
        </div>
      </div>
    </footer>
  );
}
