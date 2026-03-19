import type { HappySale } from "@/types";
import HappySalesCarousel from "./happy-sales-carousel";

interface HappySalesSectionProps {
  sales: HappySale[];
}

export default function HappySalesSection({ sales }: HappySalesSectionProps) {
  if (sales.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-900 mb-6">
          Ventas Felices
        </h2>
        <HappySalesCarousel sales={sales} />
      </div>
    </section>
  );
}
