"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehicleImage } from "@/types";
import { detailImageUrl, thumbnailImageUrl } from "@/lib/cloudinary/config";

interface VehicleGalleryProps {
  images: VehicleImage[];
  alt: string;
}

export default function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/2] bg-gray-100 rounded-[var(--radius)] flex items-center justify-center text-gray-400">
        Sin fotos
      </div>
    );
  }

  const mainImage = images[selectedIndex];
  const mainUrl = mainImage.public_id
    ? detailImageUrl(mainImage.public_id)
    : mainImage.url;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[3/2] bg-gray-100 rounded-[var(--radius)] overflow-hidden">
        <Image
          src={mainUrl}
          alt={`${alt} - Foto ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const thumbUrl = image.public_id
              ? thumbnailImageUrl(image.public_id)
              : image.url;

            return (
              <button
                key={image.public_id || index}
                onClick={() => setSelectedIndex(index)}
                className={`shrink-0 w-16 h-12 rounded-[var(--radius-sm)] overflow-hidden transition-all ${
                  index === selectedIndex
                    ? "ring-2 ring-blue-deep opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${alt} - Miniatura ${index + 1}`}
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
