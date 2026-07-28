import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });
const arabic = Noto_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Lumière Hair | Luxury Hair Extensions",
  description: "Premium Remy human hair extensions crafted for a seamless, natural blend.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const initialLocale: Locale = storedLocale === "ar" ? "ar" : "en";
  const dir = initialLocale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={initialLocale} dir={dir} className={`${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`}>
      <body>
        <LanguageProvider initialLocale={initialLocale}>
          <CartProvider>
            <CheckoutProvider>
              <Navbar />
              {children}
              <Footer />
            </CheckoutProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
