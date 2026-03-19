"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type { HappySale } from "@/types";

interface HappySalesCarouselProps {
  sales: HappySale[];
}

export default function HappySalesCarousel({ sales }: HappySalesCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="flex-none w-[220px] sm:w-[260px]"
          >
            <div className="bg-white rounded-[var(--radius)] shadow-sm overflow-hidden">
              {sale.images[0] && (
                <div className="relative w-full h-40">
                  <Image
                    src={sale.images[0].url}
                    alt={sale.vehicle_title}
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-medium text-dark-900 truncate">
                  {sale.vehicle_title}
                </p>
                <p className="text-xs text-dark-600 mt-0.5">¡Venta feliz!</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
