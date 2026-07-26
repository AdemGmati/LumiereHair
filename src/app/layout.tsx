import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Lumière Hair | Luxury Hair Extensions",
  description: "Premium Remy human hair extensions crafted for a seamless, natural blend.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
  <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
    <body>
      <CartProvider>
        <CheckoutProvider>
          <Navbar />
          {children}
          <Footer />
        </CheckoutProvider>
      </CartProvider>
      </body>
    </html>
  );
}
