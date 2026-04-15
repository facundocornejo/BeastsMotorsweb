import type { Vehicle } from "@/types";
import FeaturedCarousel from "./featured-carousel";

interface FeaturedSectionProps {
  vehicles: Vehicle[];
  title?: string;
}

export default function FeaturedSection({
  vehicles,
  title = "Destacados",
}: FeaturedSectionProps) {
  if (vehicles.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-6">
          {title}
        </h2>
        <FeaturedCarousel vehicles={vehicles} />
      </div>
    </section>
  );
}
