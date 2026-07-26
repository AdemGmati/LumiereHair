import { Clock3, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const items = [
  [
    ShieldCheck,
    "Original products",
    "Authenticated Remy hair with a money-back guarantee if quality falls short.",
  ],
  [
    BadgeCheck,
    "Satisfaction promise",
    "Not delighted? We’ll make it right — exchanges within 30 days.",
  ],
  [
    Clock3,
    "New arrivals weekly",
    "Fresh tones and lengths curated for the season’s most-worn looks.",
  ],
  [
    Truck,
    "Free standard shipping",
    "Complimentary delivery on orders over $150 — worldwide tracked.",
  ],
] as const;

/** Four concise service promises sit directly beneath the hero. */
export function TrustRow() {
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