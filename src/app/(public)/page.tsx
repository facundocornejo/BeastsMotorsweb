import {
  getFeaturedVehicles,
  getNewArrivals,
  getHappySales,
  getAvailableStockCount,
} from "@/lib/supabase/queries";
import { catalogImageUrl } from "@/lib/cloudinary/config";
import { pageMetadata, localBusinessJsonLd, webSiteJsonLd } from "@/lib/utils/seo";
import JsonLd from "@/components/seo/json-ld";
import HeroSection from "@/components/home/hero-section";
import TrustStrip from "@/components/home/trust-strip";
import FeaturedSection from "@/components/home/featured-section";
import FinanceSection from "@/components/home/finance-section";
import CategoryTilesSection from "@/components/home/category-tiles-section";
import HappySalesSection from "@/components/home/happy-sales-section";
import SellSection from "@/components/home/sell-section";
import AboutSection from "@/components/home/about-section";
import StickyMobileCTA from "@/components/layout/sticky-mobile-cta";
import HomepageCtaTracker from "@/components/home/homepage-cta-tracker";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Beast Motors — Concesionaria en Paraná, Entre Ríos",
  description:
    "Autos usados, 0km, motos y vehículos importados en Paraná, Entre Ríos. Financiación con tarjeta hasta en 24 cuotas. Consultá por WhatsApp.",
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const [featured, newArrivals, happySales, stockCount] = await Promise.all([
    getFeaturedVehicles(),
    getNewArrivals(),
    getHappySales(),
    getAvailableStockCount(),
  ]);

  // Preload first featured vehicle image for faster LCP
  const firstImage = featured[0]?.images[0];
  const preloadUrl = firstImage?.public_id
    ? catalogImageUrl(firstImage.public_id)
    : firstImage?.url;

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />
      {preloadUrl && (
        <link
          rel="preload"
          as="image"
          href={preloadUrl}
          fetchPriority="high"
        />
      )}
      <HeroSection stockCount={stockCount} />
      <TrustStrip />
      <FeaturedSection vehicles={featured} title="Destacados" />
      <FinanceSection />
      <FeaturedSection vehicles={newArrivals} title="Recién ingresados" />
      <CategoryTilesSection stockCount={stockCount} />
      <HappySalesSection sales={happySales} />
      <SellSection />
      <AboutSection />
      <StickyMobileCTA />
      <HomepageCtaTracker />
    </>
  );
}
