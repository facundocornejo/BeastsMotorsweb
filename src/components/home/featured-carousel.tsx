"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import type { Vehicle } from "@/types";
import VehicleCard from "@/components/vehicles/vehicle-card";

interface FeaturedCarouselProps {
  vehicles: Vehicle[];
}

export default function FeaturedCarousel({ vehicles }: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="flex-none w-[280px] sm:w-[320px] lg:w-[340px]"
            >
              <VehicleCard vehicle={vehicle} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>

      {vehicles.length > 2 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-dark-600 hover:text-blue-deep transition-colors hidden md:flex"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-dark-600 hover:text-blue-deep transition-colors hidden md:flex"
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
