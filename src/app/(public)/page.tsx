import {
  getFeaturedVehicles,
  getNewArrivals,
  getAvailableVehicles,
  getHappySales,
} from "@/lib/supabase/queries";
import { catalogImageUrl } from "@/lib/cloudinary/config";
import HeroSection from "@/components/home/hero-section";
import FilterChips from "@/components/home/filter-chips";
import FeaturedSection from "@/components/home/featured-section";
import CatalogSection from "@/components/home/catalog-section";
import FinanceSection from "@/components/home/finance-section";
import SellSection from "@/components/home/sell-section";
import HappySalesSection from "@/components/home/happy-sales-section";
import AboutSection from "@/components/home/about-section";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, newArrivals, allVehicles, happySales] = await Promise.all([
    getFeaturedVehicles(),
    getNewArrivals(),
    getAvailableVehicles(),
    getHappySales(),
  ]);

  // Preload first featured vehicle image for faster LCP
  const firstImage = featured[0]?.images[0];
  const preloadUrl = firstImage?.public_id
    ? catalogImageUrl(firstImage.public_id)
    : firstImage?.url;

  return (
    <>
      {preloadUrl && (
        <link
          rel="preload"
          as="image"
          href={preloadUrl}
          fetchPriority="high"
        />
      )}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterChips />
      </div>

      <FeaturedSection vehicles={featured} title="Destacados" />
      <FeaturedSection vehicles={newArrivals} title="Recién ingresados" />
      <CatalogSection vehicles={allVehicles} />
      <FinanceSection />
      <SellSection />
      <HappySalesSection sales={happySales} />
      <AboutSection />
    </>
  );
}
