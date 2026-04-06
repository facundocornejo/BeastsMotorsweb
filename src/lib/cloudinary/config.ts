export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const CLOUDINARY_FOLDERS = {
  vehicles: "beast-motors/vehicles",
  happySales: "beast-motors/happy-sales",
} as const;

/** Catalog card: 480x360 — matches mobile card display size */
export function catalogImageUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,g_auto,w_480,h_360,q_auto,f_auto/${publicId}`;
}

/** Detail page: 800x533 */
export function detailImageUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,g_auto,w_800,h_533,q_auto,f_auto/${publicId}`;
}

/** Thumbnail: 128x96 — small previews */
export function thumbnailImageUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,g_auto,w_128,h_96,q_auto,f_auto/${publicId}`;
}
