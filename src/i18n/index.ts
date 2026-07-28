import { ar } from "./translations/ar";
import { en } from "./translations/en";

export const locales = {
  en,
  ar,
} as const;

export type Locale = keyof typeof locales;
export type TranslationDictionary = (typeof en);

export const defaultLocale: Locale = "en";

export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.split("/")[1];
  return match === "ar" ? "ar" : "en";
}

export function getLocaleLabel(locale: Locale) {
  return locale === "ar" ? "العربية" : "English";
}

export function getTranslation(locale: Locale | undefined, section?: keyof TranslationDictionary) {
  const selectedLocale = locale && locale in locales ? locale : defaultLocale;
  const dictionary = locales[selectedLocale];
  return section ? dictionary[section] : dictionary;
}

export function getNestedTranslation<T = unknown>(locale: Locale | undefined, path: string) {
  const selectedLocale = locale && locale in locales ? locale : defaultLocale;
  const dictionary = locales[selectedLocale] as Record<string, unknown>;
  return path.split(".").reduce<unknown>((value, key) => {
    if (value && typeof value === "object" && key in value) {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, dictionary) as T;
}

export function getLocalePath(pathname: string, locale: Locale) {
  const cleanPath = pathname.split("?")[0].split("#")[0];
  const segments = cleanPath.split("/").filter(Boolean);

  if (!segments.length) {
    return locale === "ar" ? "/ar" : "/";
  }

  if (segments[0] === "ar") {
    segments.shift();
  }

  if (locale === "ar") {
    return `/${["ar", ...segments].join("/")}`;
  }

  return `/${segments.join("/")}`;
}
