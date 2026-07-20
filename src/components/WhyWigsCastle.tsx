import { Sparkles, Palette, Globe, CreditCard, Heart, type LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  label: string;
};

const features: Feature[] = [
  { icon: Sparkles, label: '100% Human Hair' },
  { icon: Palette, label: 'Free Colour Match' },
  { icon: Globe, label: 'Worldwide Shipping' },
  { icon: CreditCard, label: 'Buy Now, Pay Later' },
];

export default function WhyWigsCastle() {
  return (
    <section className="w-full bg-wigs-primary-light/10 py-14 sm:py-16">
      <div className="container mx-auto px-6">

        <h2 className="mb-10 text-center sm:mb-12">
          <span className="font-display text-3xl italic text-wigs-text-primary sm:text-4xl">why</span>{' '}
          <span className="font-body text-3xl font-extrabold uppercase tracking-tight text-wigs-text-primary sm:text-4xl">
            WigsCastle?
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Icon className="h-10 w-10 text-wigs-text-primary" strokeWidth={1.5} />
                <Heart
                  className="absolute -right-2.5 -top-1.5 h-4 w-4 text-wigs-primary"
                  strokeWidth={2}
                  fill="currentColor"
                  fillOpacity={0.15}
                />
              </div>
              <p className="mx-auto max-w-36 font-body text-sm font-bold uppercase leading-snug tracking-wide text-wigs-text-primary sm:text-base">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
