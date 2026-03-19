export function slugify(
  brand: string,
  model: string,
  version: string | null,
  year: number
): string {
  const parts = [brand, model, version, String(year)]
    .filter(Boolean)
    .join(" ");

  return parts
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}
