"use client";

import { useState, useRef } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import type { VehicleImage } from "@/types";

interface ImageUploaderProps {
  images: VehicleImage[];
  onChange: (images: VehicleImage[]) => void;
  folder?: string;
  maxImages?: number;
}

interface UploadingImage {
  id: string;
  preview: string;
}

export default function ImageUploader({
  images,
  onChange,
  folder = "vehicles",
  maxImages = 15,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState<UploadingImage[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    const remaining = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remaining);

    const previews: UploadingImage[] = filesToUpload.map((file) => ({
      id: crypto.randomUUID(),
      preview: URL.createObjectURL(file),
    }));
    setUploading((prev) => [...prev, ...previews]);

    const newImages: VehicleImage[] = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          newImages.push({
            url: data.url,
            public_id: data.public_id,
            order: images.length + newImages.length,
          });
        }
      } catch {
        // Skip failed uploads silently
      }

      // Remove this preview
      setUploading((prev) => prev.filter((p) => p.id !== previews[i].id));
      URL.revokeObjectURL(previews[i].preview);
    }

    if (newImages.length > 0) {
      onChange([...images, ...newImages]);
    }
  }

  async function handleRemove(index: number) {
    const image = images[index];
    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    onChange(updated);

    // Clean up from Cloudinary in background
    fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: image.public_id }),
    }).catch(() => {});
  }

  function handleSetCover(index: number) {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onChange(updated.map((img, i) => ({ ...img, order: i })));
  }

  function handleMove(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    const updated = [...images];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated.map((img, i) => ({ ...img, order: i })));
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...images];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, dragged);

    onChange(updated.map((img, i) => ({ ...img, order: i })));
    setDragIndex(null);
    setDragOverIndex(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-dark-700">
          Fotos ({images.length}/{maxImages})
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={images.length >= maxImages}
          className="text-sm text-blue-mid hover:text-blue-deep disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Agregar fotos
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      {images.length === 0 && uploading.length === 0 && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-[var(--radius)] p-8 text-center text-sm text-gray-400 hover:border-blue-mid hover:text-blue-mid transition-colors"
        >
          Click para subir fotos del vehículo
        </button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={image.public_id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => {
              setDragIndex(null);
              setDragOverIndex(null);
            }}
            className={`relative aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden cursor-grab active:cursor-grabbing group ${
              dragOverIndex === index ? "ring-2 ring-blue-mid" : ""
            }`}
          >
            <img
              src={image.url}
              alt={`Foto ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {index === 0 ? (
              <span className="absolute top-1 left-1 bg-blue-deep text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                Portada
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleSetCover(index)}
                className="absolute top-1 left-1 bg-black/50 hover:bg-blue-deep text-white text-[10px] font-semibold px-1.5 py-0.5 rounded sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              >
                Portada
              </button>
            )}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 w-7 h-7 sm:w-5 sm:h-5 bg-black/60 text-white rounded-full flex items-center justify-center text-xs sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
            {/* Move arrows */}
            {images.length > 1 && (
              <div className="absolute bottom-1 left-1 right-1 flex justify-between sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === images.length - 1}
                  className="w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}

        {uploading.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden bg-gray-100"
          >
            <img
              src={item.preview}
              alt="Subiendo..."
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin h-6 w-6 text-blue-mid" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
