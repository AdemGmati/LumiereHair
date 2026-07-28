"use client";

import Link from "next/link";
import { Globe, Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartSlider } from "@/components/cart/CartSlider";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Reference-matched responsive header retaining existing Supabase auth and cart entry points. */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const { locale, setLocale, t, tStr } = useLanguage();

  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [search, setSearch] = useState("");

  const navigation = [
    [t("navbar.home"), "/"],
    [t("navbar.shopAll"), "/products"],
    [t("navbar.clipIns"), "/products?cat=clip-ins"],
    [t("navbar.ponytails"), "/products?cat=ponytails"],
    [t("navbar.tape"), "/products?cat=tape"],
    [t("navbar.new"), "/products?badge=new"],
    [t("navbar.sale"), "/products?badge=sale"],
  ] as const;

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setSignedIn(Boolean(data.user)));
  }, []);

  const submitSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const queryParam = search.trim() ? `?q=${encodeURIComponent(search.trim())}` : "";
      router.push(`/products${queryParam}`);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="flex min-h-9 items-center justify-center bg-[#311b43] px-4 text-center text-xs tracking-[.04em] text-white/90">
        {t("navbar.announcementPart1")} {" "}
        <strong className="mx-1 font-semibold text-violet-300">
          {t("navbar.announcementPart2")}
        </strong>{" "}
        · {t("navbar.announcementPart3")} {" "}
        <strong className="ml-1 font-semibold text-violet-300">
          LUMIERE20
        </strong>{" "}
        {t("navbar.announcementPart4")}
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-[#ebe6f1] bg-white/92 backdrop-blur">
        <div className="mx-auto grid min-h-[72px] max-w-[1200px] grid-cols-[1fr_auto] items-center gap-4 px-5 md:grid-cols-[1fr_auto_1fr]">
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center md:hidden"
              aria-label={t("common.openMenu")}
            >
              <Menu className="size-5" />
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src="/lumiere-badge-full.png"
                alt="Lumière Hair"
                width={816}
                height={746}
                priority
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Search Input */}
          <label className="relative hidden w-[min(420px,100%)] md:block">
            <Search className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-[#796782]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={submitSearch}
              placeholder={t("common.searchPlaceholder")}
              aria-label={t("common.search")}
              className="w-full rounded-full border border-[#ebe6f1] bg-[#f8f8fc] py-2.5 ps-10 pe-4 text-sm outline-none focus:border-violet-400"
            />
          </label>

          {/* Action Icons */}
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="hidden min-h-[42px] items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-[#311b43] hover:bg-[#f8f8fc] hover:text-violet-500 md:inline-flex"
              aria-label={t("common.toggleLanguage")}
            >
              <Globe className="size-4" />
              <span>{locale === "ar" ? tStr("common.languageEnglish") : tStr("common.languageArabic")}</span>
            </button>

            <button
              onClick={() =>
                router.push(signedIn ? "/user/center" : "/user/login")
              }
              className="grid size-[42px] place-items-center rounded-full hover:bg-[#f8f8fc] hover:text-violet-500"
              aria-label={t("common.account")}
            >
              <User className="size-5" />
            </button>

            <button
              className="hidden size-[42px] place-items-center rounded-full hover:bg-[#f8f8fc] hover:text-violet-500 sm:grid"
              aria-label={t("common.wishlist")}
            >
              <Heart className="size-5" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative grid size-[42px] place-items-center rounded-full hover:bg-[#f8f8fc] hover:text-violet-500"
              aria-label={t("common.openBag")}
            >
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <span className="absolute end-0 top-0 grid min-w-[18px] place-items-center rounded-full bg-violet-500 px-1 text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden border-t border-[#ebe6f1] md:block"
          aria-label="Primary"
        >
          <div className="mx-auto flex max-w-[1200px] justify-center overflow-auto px-5">
            {navigation.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={`border-b-2 px-4 py-3 text-[13px] font-medium uppercase tracking-[.04em] ${pathname === href.split("?")[0]
                  ? "border-violet-500 text-violet-500"
                  : "border-transparent text-[#796782] hover:text-violet-500"
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 flex flex-col gap-1 bg-white p-5 transition-transform md:hidden ${
          menuOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl font-semibold"
          >
            Lumière Hair
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="grid size-10 place-items-center"
            aria-label={t("common.closeMenu")}
          >
            <X />
          </button>
        </div>

        {navigation.slice(0, 5).map(([label, href]) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="border-b border-[#ebe6f1] px-2 py-4 text-[15px] font-semibold"
          >
            {label}
          </Link>
        ))}

        <button
          onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
          className="mt-4 flex min-h-[48px] items-center gap-2 border-b border-[#ebe6f1] px-2 py-4 text-[15px] font-semibold text-[#311b43]"
          aria-label={t("common.toggleLanguage")}
        >
          <Globe className="size-5" />
          {locale === "ar" ? tStr("common.languageEnglish") : tStr("common.languageArabic")}
        </button>
      </div>

      {/* Cart Slider Component */}
      <CartSlider isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
