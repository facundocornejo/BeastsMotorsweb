import {
  getFeaturedVehicles,
  getNewArrivals,
  getHappySales,
  getAvailableStockCount,
} from "@/lib/supabase/queries";
import { catalogImageUrl } from "@/lib/cloudinary/config";
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

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  name: "Beast Motors",
  url: "https://beastmotors.com.ar",
  image: "https://beastmotors.com.ar/og-default.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Circunvalación José Hernández 2718",
    addressLocality: "Paraná",
    addressRegion: "Entre Ríos",
    postalCode: "E3100",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.748742,
    longitude: -60.482740,
  },
  priceRange: "$$",
  areaServed: {
    "@type": "City",
    name: "Paraná",
  },
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
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
