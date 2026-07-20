'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PackageCheck, BadgePlus, Truck, ArrowRight } from 'lucide-react';

const highlights = ['100% Human Hair', 'Naturally Treated', 'High Quality'];

const features = [
  {
    icon: PackageCheck,
    title: 'Original Products',
    copy: 'We provide a money-back guarantee if the product is not original.',
  },
  {
    icon: BadgePlus,
    title: 'New Arrivals',
    copy: 'We update our collection with new arrivals almost every week.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    copy: 'Fast delivery and secure shipping for every customer.',
  },
];

export default function Hero() {
  return (
    <section className="w-full bg-wigs-bg-alt">
      <div className="relative w-full overflow-hidden aspect-9/16 sm:aspect-4/3 lg:aspect-video">

        {/* Mobile background */}
        <Image
          src="/background-mobile.png"
          alt="Woman wearing long, wavy luxury hair extensions"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />

        {/* Tablet background */}
        <Image
          src="/background-tablet.png"
          alt="Woman wearing long, wavy luxury hair extensions"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover sm:block lg:hidden"
        />

        {/* Desktop background */}
        <Image
          src="/background-image.png"
          alt="Woman wearing long, wavy luxury hair extensions"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover lg:block"
        />

        {/* Legibility scrim - keeps text readable regardless of exact crop */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-wigs-bg-alt/90 via-wigs-bg-alt/40 to-transparent sm:from-wigs-bg-alt/75 sm:via-wigs-bg-alt/15" />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-center pb-20 md:pb-28">
          <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-xs sm:max-w-md lg:max-w-xl">

              <p className="font-body text-sm sm:text-xl lg:text-3xl font-semibold text-wigs-primary mb-2">
                Look Great With
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-wigs-text-primary leading-tight">
                Extensions
              </h1>

              <ul className="mt-5 sm:mt-8 space-y-2 lg:space-y-3 font-body text-sm sm:text-base lg:text-lg text-wigs-text-secondary">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-wigs-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/products"
                className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-wigs-primary to-wigs-primary-dark px-6 py-3 sm:px-8 sm:py-4 font-body font-semibold text-white shadow-lg shadow-wigs-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-wigs-primary-dark/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wigs-primary focus-visible:ring-offset-2"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>
          </div>
        </div>

        {/* Bottom features bar */}
        <div className="absolute inset-x-0 bottom-0 hidden border-t border-wigs-primary-light/20 bg-wigs-primary-dark/90 backdrop-blur-md md:block">
          <div className="container mx-auto grid grid-cols-3 gap-8 px-8 py-5">
            {features.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex items-start gap-4 text-white">
                <Icon className="h-8 w-8 shrink-0 text-wigs-primary-light" />
                <div>
                  <h3 className="font-body font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-white/75">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
