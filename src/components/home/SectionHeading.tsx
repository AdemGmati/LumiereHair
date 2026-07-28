"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  href?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  href = "/products",
}: SectionHeadingProps) {
  const { tStr } = useLanguage();

  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-violet-500">
          {eyebrow}
        </p>
        <h2 className="font-display text-[clamp(1.85rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-.02em]">
          {title}
        </h2>
      </div>

      <Link
        href={href}
        className="shrink-0 text-[13px] font-semibold tracking-[.04em] text-violet-500 hover:underline"
      >
        {tStr("common.viewAllArrow")}
      </Link>
    </div>
  );
}
