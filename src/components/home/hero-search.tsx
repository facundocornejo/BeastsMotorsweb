"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackSearch } from "@/lib/utils/analytics";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      trackSearch(query.trim());
      router.push(`/vehiculos?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/vehiculos");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg" role="search">
      <label htmlFor="hero-search" className="sr-only">Buscar vehículos</label>
      <input
        id="hero-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar marca, modelo..."
        className="flex-1 px-4 py-3 rounded-l-[var(--radius)] text-sm text-dark-900 bg-white placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-rose text-white font-medium text-sm rounded-r-[var(--radius)] hover:bg-rose-dark transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
