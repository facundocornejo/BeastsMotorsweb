const TRUST_SIGNALS = [
  {
    label: "Recibimos tu usado",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 8l4 4-4 4" />
        <path d="M3 12h18" />
        <path d="M7 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    label: "Financiación propia y bancaria",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Importados Haval y otras marcas",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Atención personal en Paraná",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

function Item({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 shrink-0 group">
      <span className="text-[var(--rose)] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="text-xs md:text-sm font-medium tracking-wide text-[var(--dark-800)] whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 w-1 h-1 rounded-full bg-[var(--blue-light)]/60"
    />
  );
}

export default function TrustStrip() {
  return (
    <section
      aria-label="Por qué elegirnos"
      className="relative bg-[var(--cream-soft)] border-y border-[var(--gray-200)] overflow-hidden"
    >
      {/* Subtle accent line at top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--rose)]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="trust-marquee relative py-3 md:py-4">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[var(--cream-soft)] to-transparent z-10" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[var(--cream-soft)] to-transparent z-10" aria-hidden="true" />

        <div className="trust-marquee-track flex items-center gap-6 md:gap-10 w-max">
          {[...TRUST_SIGNALS, ...TRUST_SIGNALS].map((signal, i) => (
            <span key={i} className="flex items-center gap-6 md:gap-10">
              <Item label={signal.label} icon={signal.icon} />
              <Divider />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
