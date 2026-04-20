"use client";

import { useState } from "react";
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

  const [selected, setSelected] = useState<HappySale | null>(null);

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="flex-none w-[220px] sm:w-[260px]"
            >
              <button
                type="button"
                onClick={() => setSelected(sale)}
                className="w-full text-left bg-[var(--white)] rounded-[var(--radius)] shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
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
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-[var(--white)] rounded-[var(--radius)] overflow-hidden max-w-xl w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {selected.images[0] && (
              <Image
                src={selected.images[0].url}
                alt={selected.vehicle_title}
                width={800}
                height={600}
                className="w-full h-auto"
                sizes="(max-width: 640px) 95vw, 512px"
              />
            )}

            <div className="p-4">
              <p className="font-semibold text-dark-900 text-base">
                {selected.vehicle_title}
              </p>
              <p className="text-sm text-dark-600 mt-0.5">¡Venta feliz! 🎉</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
