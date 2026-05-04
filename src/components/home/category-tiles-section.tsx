import Link from "next/link";

interface CategoryTilesSectionProps {
  stockCount: number;
}

const CATEGORIES = [
  {
    number: "01",
    label: "Autos",
    sublabel: "USADOS",
    description: "Seleccionados, con garantía",
    href: "/vehiculos?type=usado",
    accent: "var(--blue-deep)",
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor" aria-hidden="true">
        <path d="M30 130 L40 90 Q44 78 56 78 L144 78 Q156 78 160 90 L170 130 L170 155 Q170 162 163 162 L150 162 Q143 162 143 155 L143 148 L57 148 L57 155 Q57 162 50 162 L37 162 Q30 162 30 155 Z M55 95 L65 78 L135 78 L145 95 Z" />
        <circle cx="65" cy="148" r="14" />
        <circle cx="135" cy="148" r="14" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "0km",
    sublabel: "NUEVOS",
    description: "Sin uso, listos para entregar",
    href: "/vehiculos?type=0km",
    accent: "var(--rose)",
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor" aria-hidden="true">
        <path d="M100 20 L118 75 L175 75 L130 110 L148 165 L100 132 L52 165 L70 110 L25 75 L82 75 Z" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Motos",
    sublabel: "TODAS",
    description: "Usadas y 0km",
    href: "/motos",
    accent: "var(--blue-light)",
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor" aria-hidden="true">
        <circle cx="45" cy="140" r="32" />
        <circle cx="155" cy="140" r="32" />
        <circle cx="45" cy="140" r="14" fill="var(--cream-soft)" />
        <circle cx="155" cy="140" r="14" fill="var(--cream-soft)" />
        <path d="M120 60 L145 60 L155 95 L130 108 L100 75 L75 115 L50 115 L45 105 L70 100 L85 80 L75 70 L100 60 Z" />
      </svg>
    ),
  },
  {
    number: "04",
    label: "Next",
    sublabel: "GENERATION",
    description: "Importados Haval y más",
    href: "/next-generation",
    accent: "var(--blue-mid)",
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor" aria-hidden="true">
        <path d="M115 20 L40 115 L92 115 L82 180 L160 80 L108 80 Z" />
      </svg>
    ),
  },
];

export default function CategoryTilesSection({ stockCount }: CategoryTilesSectionProps) {
  const ctaLabel =
    stockCount > 0
      ? `Ver catálogo completo (${stockCount} ${stockCount === 1 ? "vehículo" : "vehículos"})`
      : "Ver catálogo completo";

  return (
    <section className="py-14 md:py-24 bg-[var(--cream-soft)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header — editorial style */}
        <div className="mb-10 md:mb-14 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] md:text-xs text-[var(--rose)] tracking-[0.3em] uppercase mb-2 md:mb-3">
              — Categorías
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-[var(--dark-900)] leading-[0.95]">
              Explorá<br className="md:hidden" /> por categoría
            </h2>
          </div>
          <div
            aria-hidden="true"
            className="hidden md:block h-px flex-1 bg-gradient-to-r from-[var(--gray-200)] to-transparent mb-3"
          />
        </div>

        {/* Tiles grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-10 md:mb-14">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              data-cta-section="category_tile"
              data-cta-label={cat.label}
              style={{ ["--accent" as string]: cat.accent }}
              className="group relative overflow-hidden bg-[var(--white)] rounded-[var(--radius)] border border-[var(--gray-200)] p-4 md:p-7 min-h-[180px] md:min-h-[300px] flex flex-col hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all duration-500"
            >
              {/* Background pictogram — huge, low opacity, lights up on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-56 md:h-56 text-[var(--accent)] opacity-[0.06] group-hover:opacity-[0.18] group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-700 ease-out"
              >
                {cat.bgIcon}
              </span>

              {/* Diagonal accent corner — only on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-700 ease-out"
              />

              {/* Number */}
              <div className="relative font-mono text-[10px] md:text-xs text-[var(--dark-600)] tracking-[0.25em] mb-1.5 md:mb-2">
                {cat.number}
              </div>

              {/* Animated accent line under number */}
              <div
                className="relative h-[2px] bg-[var(--accent)] w-6 md:w-10 group-hover:w-16 md:group-hover:w-24 transition-all duration-500 mb-3 md:mb-5"
              />

              {/* Title — display + sublabel */}
              <h3 className="relative font-display leading-[0.92] mb-1.5 md:mb-2">
                <span className="block text-2xl md:text-4xl text-[var(--dark-900)]">
                  {cat.label}
                </span>
                <span className="block text-base md:text-2xl text-[var(--dark-700)] tracking-wide">
                  {cat.sublabel}
                </span>
              </h3>

              {/* Description */}
              <p className="relative text-[11px] md:text-sm text-[var(--dark-600)] leading-snug mb-4">
                {cat.description}
              </p>

              {/* CTA — bottom */}
              <span className="relative mt-auto inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-[var(--accent)]">
                Explorar
                <span
                  className="inline-block group-hover:translate-x-2 transition-transform duration-500 ease-out"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="flex justify-center">
          <Link
            href="/vehiculos"
            data-cta-section="category_tile"
            data-cta-label="ver_catalogo_completo"
            className="group inline-flex items-center gap-2 bg-[var(--blue-deep)] text-white font-medium px-7 py-3.5 rounded-[var(--radius-sm)] hover:bg-[var(--rose)] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {ctaLabel}
            <span
              className="inline-block group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
