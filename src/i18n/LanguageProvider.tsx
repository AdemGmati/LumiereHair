"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n";
import { defaultLocale, getLocaleLabel } from "@/i18n";
import { ar } from "@/i18n/translations/ar";
import { en } from "@/i18n/translations/en";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // Translation paths can resolve to text or a translated list.
  t: (path: string) => any;
  tStr: (path: string, params?: Record<string, string>) => string;
  localeLabel: string;
  dictionary: typeof en;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const dictionaries = { en, ar };

function getValueByPath(value: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, value);
}

export function LanguageProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? defaultLocale);

  useEffect(() => {
    document.title = locale === "ar"
      ? "لوميير هير | وصلات شعر فاخرة"
      : "Lumière Hair | Luxury Hair Extensions";
  }, [locale]);

  const applyLocale = (nextLocale: Locale) => {
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.localStorage.setItem("lumiere-locale", nextLocale);
  };

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    applyLocale(nextLocale);
    router.refresh();
  };

  const t = (path: string): any => getValueByPath(dictionaries[locale], path);

  const tStr = (path: string, params?: Record<string, string>): string => {
    const translated = t(path);
    if (typeof translated !== "string") return String(translated ?? path);
    let value = translated;
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        value = value.replace(`{${key}}`, val);
      }
    }
    return value;
  };

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
    tStr,
    localeLabel: getLocaleLabel(locale),
    dictionary: dictionaries[locale],
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
