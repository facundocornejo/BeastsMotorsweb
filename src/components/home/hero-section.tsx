import Link from "next/link";
import HeroSearch from "./hero-search";
import PaymentLogos, { CARD_FINANCING_PARTNERS } from "@/components/ui/payment-logos";

interface HeroSectionProps {
  stockCount: number;
}

export default function HeroSection({ stockCount }: HeroSectionProps) {
  const stockLabel =
    stockCount > 0
      ? `${stockCount} ${stockCount === 1 ? "vehículo disponible" : "vehículos disponibles"} · Paraná, Entre Ríos`
      : "Paraná, Entre Ríos";

  return (
    <section className="bg-[var(--blue-deep)] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs md:text-sm font-medium text-white/90 mb-5">
          <span className="w-2 h-2 rounded-full bg-[var(--green-wa)]" aria-hidden="true" />
          {stockLabel}
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
          Tu próximo vehículo
          <br />
          <span className="text-white/90">está acá</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Autos usados, 0km, motos y vehículos importados. Financiación propia y atención personalizada.
        </p>
        <div className="flex justify-center">
          <HeroSearch />
        </div>
        <Link
          href="/financiacion"
          data-cta-section="hero"
          data-cta-label="financiacion"
          className="group inline-block mt-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-[var(--radius-sm)]"
        >
          <p className="text-sm text-white/80 mb-3">
            Financiá hasta en <span className="font-semibold text-white">24 cuotas</span> con:
          </p>
          <PaymentLogos size="md" partners={CARD_FINANCING_PARTNERS} className="max-w-3xl mx-auto" />
          <p className="text-sm font-medium text-white/80 mt-3 group-hover:text-white transition-colors">
            Ver opciones de financiación
            <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </p>
        </Link>
      </div>
    </section>
  );
}
