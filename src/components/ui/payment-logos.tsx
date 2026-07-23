import Image from "next/image";

export type FinancingPartnerId =
  | "visa"
  | "amex"
  | "naranja"
  | "sidecreer"
  | "credicuotas"
  | "credito-argentino"
  | "san-cristobal";

interface FinancingPartner {
  name: string;
  logo: string;
  width: number;
  height: number;
  /* Cuando el logo es solo isotipo (sin nombre), se muestra el nombre al lado */
  showName?: boolean;
  /* Factor de altura para logos cuadrados/compactos que se ven chicos a altura estándar */
  scale?: number;
}

const FINANCING_PARTNERS: Record<FinancingPartnerId, FinancingPartner> = {
  visa: { name: "Visa", logo: "/financiacion/visa.svg", width: 1000, height: 325 },
  amex: { name: "American Express", logo: "/financiacion/amex.svg", width: 1000, height: 998, scale: 1.9 },
  naranja: { name: "Naranja X", logo: "/financiacion/naranja.svg", width: 200, height: 60 },
  sidecreer: { name: "Sidecreer", logo: "/financiacion/sidecreer.png", width: 201, height: 50 },
  credicuotas: { name: "Credicuotas", logo: "/financiacion/credicuotas.svg", width: 127, height: 19 },
  "credito-argentino": {
    name: "Crédito Argentino",
    logo: "/financiacion/credito-argentino.png",
    width: 50,
    height: 54,
    showName: true,
  },
  "san-cristobal": { name: "San Cristóbal", logo: "/financiacion/san-cristobal.png", width: 127, height: 25 },
};

export const ALL_FINANCING_PARTNERS = Object.keys(FINANCING_PARTNERS) as FinancingPartnerId[];

/* Solo tarjetas de crédito (para el hero del home) */
export const CARD_FINANCING_PARTNERS: FinancingPartnerId[] = [
  "visa",
  "amex",
  "naranja",
  "sidecreer",
];

/* Herramientas disponibles según tipo de vehículo (info de Beast Motors 07/2026) */
export const AUTO_FINANCING_PARTNERS: FinancingPartnerId[] = [
  "visa",
  "amex",
  "naranja",
  "sidecreer",
  "credicuotas",
  "san-cristobal",
];
export const MOTO_FINANCING_PARTNERS: FinancingPartnerId[] = [
  "visa",
  "amex",
  "naranja",
  "sidecreer",
  "credicuotas",
  "credito-argentino",
];

interface PaymentLogosProps {
  size?: "sm" | "md";
  partners?: FinancingPartnerId[];
  className?: string;
}

const SIZES = {
  sm: { chip: "h-7 px-2.5", logoPx: 14 },
  md: { chip: "h-9 px-3", logoPx: 18 },
} as const;

export default function PaymentLogos({
  size = "md",
  partners = ALL_FINANCING_PARTNERS,
  className = "",
}: PaymentLogosProps) {
  const s = SIZES[size];

  return (
    <ul className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {partners.map((id) => {
        const partner = FINANCING_PARTNERS[id];
        const logoHeightPx = Math.round(s.logoPx * (partner.scale ?? 1));
        const logoWidth = Math.round((partner.width / partner.height) * logoHeightPx);
        return (
          <li
            key={id}
            // bg-white literal a propósito (no var(--white)): los logos de terceros
            // tienen colores fijos y necesitan fondo claro también en dark mode.
            className={`flex items-center gap-1.5 bg-white rounded-[var(--radius-sm)] ring-1 ring-black/10 ${s.chip}`}
            title={partner.name}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={logoWidth}
              height={logoHeightPx}
              style={{ height: `${logoHeightPx}px` }}
              className="w-auto"
              unoptimized
            />
            {partner.showName && (
              <span
                className={`font-semibold text-[#0d3b45] whitespace-nowrap ${size === "sm" ? "text-[11px]" : "text-xs"}`}
              >
                {partner.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
