"use client";

import { Clock3, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const iconMap = {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Truck,
} as const;

/** Four concise service promises sit directly beneath the hero. */
export function TrustRow() {
  const { t } = useLanguage();
  const items = ((t("home.trust.items") as Array<{ title: string; copy: string }>) ?? []).map((item, index) => {
    const icons = [ShieldCheck, BadgeCheck, Clock3, Truck] as const;
    return [icons[index], item.title, item.copy] as const;
  });
  return (
    <section className="mx-auto max-w-300 px-5 py-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map(([Icon, title, copy]) => (
          <article
            key={title}
            className="flex gap-3.5 rounded-[14px] border bg-white p-4"
          >
            <span className="grid size-10.5 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-500">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-1 text-[12.5px] leading-[1.45] text-[#796782]">
                {copy}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}