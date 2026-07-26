import { Categories } from "@/components/home/Categories";
import { HomeHero } from "@/components/home/HomeHero";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductSections } from "@/components/home/ProductSections";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TrustRow } from "@/components/home/TrustRow";

/** The homepage is intentionally an assembly of focused marketing sections. */
export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <TrustRow />
      <Categories />
      <ProductSections />
      <PromoBanner />
      <Newsletter />
    </main>
  );
}
