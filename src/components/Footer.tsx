'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Truck, Package, ShieldCheck, BadgeCheck, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Q&A', href: '/faq' },
  { label: 'Return & Exchange', href: '/returns' },
  { label: 'Shipping Info', href: '/shipping' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Track Your Order', href: '/track-order' },
];

const serviceItems = [
  { icon: Truck, label: 'Free shipping on orders over $39.' },
  { icon: Package, label: '30 day refund guarantee' },
  { icon: ShieldCheck, label: 'Worry free guarantee' },
  { icon: BadgeCheck, label: 'Lifetime customer support' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to your subscribe endpoint (Supabase table, email provider, etc.)
    console.log('subscribe:', email);
    setEmail('');
  }

  return (
    <footer className="w-full border-t border-wigs-primary/20 bg-wigs-text-primary">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-3 lg:gap-8 lg:px-16">

        {/* Quick links */}
        <ul className="space-y-4 font-body text-sm">
          {quickLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-white/70 transition-colors hover:text-wigs-primary-light"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Service */}
        <div>
          <h3 className="mb-6 font-body text-lg font-bold text-white">Service</h3>
          <ul className="space-y-4 font-body text-sm text-white/80">
            {serviceItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-wigs-primary-light" strokeWidth={1.5} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 font-body text-lg font-bold text-white">Sign up and save</h3>
          <p className="mb-5 max-w-sm font-body text-sm font-semibold text-white/90">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-sm">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-3 transition-colors focus-within:border-wigs-primary-light">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent font-body text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 text-white transition-colors hover:text-wigs-primary-light"
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>

      </div>
    </footer>
  );
}
