import type { Metadata } from "next";
import { Wallet, Zap, Handshake, type LucideIcon } from "lucide-react";
import { buildPlanesWhatsAppLink } from "@/lib/utils/whatsapp";
import FinanceForm from "@/components/planes/finance-form";

export const metadata: Metadata = {
  title: "Financiación y Planes de Ahorro — Beast Motors Paraná",
  description:
    "Financiá tu vehículo con las mejores opciones de crédito y planes de ahorro automotor. Beast Motors, concesionaria en Paraná, Entre Ríos.",
  openGraph: {
    title: "Financiación y Planes de Ahorro | Beast Motors",
    description:
      "Financiá tu vehículo con las mejores opciones de crédito y planes de ahorro automotor. Beast Motors, concesionaria en Paraná, Entre Ríos.",
    url: "/planes",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Financiación Beast Motors" }],
  },
};

const FINANCE_BENEFITS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wallet,
    title: "Cuotas accesibles",
    description:
      "Planes de financiación adaptados a tu presupuesto. Cuotas fijas y variables para que elijas la que mejor se ajuste.",
  },
  {
    icon: Zap,
    title: "Aprobación rápida",
    description:
      "Gestionamos tu crédito de forma ágil. Respuesta en pocas horas para que no pierdas la oportunidad.",
  },
  {
    icon: Handshake,
    title: "Asesoramiento personalizado",
    description:
      "Te ayudamos a elegir la mejor opción según tu situación. Sin letra chica, con total transparencia.",
  },
];

const AHORRO_STEPS = [
  {
    step: "01",
    title: "Suscribite",
    description:
      "Elegí el plan que mejor se adapte a tus posibilidades y al vehículo que querés.",
  },
  {
    step: "02",
    title: "Ahorrá mes a mes",
    description:
      "Pagá cuotas mensuales accesibles. Participás de actos de adjudicación por sorteo o licitación.",
  },
  {
    step: "03",
    title: "Retirá tu 0km",
    description:
      "Una vez adjudicado, retirás tu vehículo 0km directamente de la concesionaria.",
  },
];

export default function PlanesPage() {
  const waLink = buildPlanesWhatsAppLink();

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-deep text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-light mb-3">
            Beast Motors
          </p>
          <h1 className="font-display text-3xl md:text-5xl mb-4">
            Financiación y Planes de Ahorro
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Hacé realidad tu próximo vehículo. Te ofrecemos las mejores
            alternativas de financiación y planes de ahorro para que llegues
            a tu auto o moto de la forma que más te convenga.
          </p>
        </div>
      </section>

      {/* Financiación */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
              Financiamos tu compra
            </h2>
            <p className="text-dark-700 max-w-2xl mx-auto">
              Trabajamos con distintas entidades financieras para ofrecerte
              créditos prendarios y financiación directa. Vos elegís el
              vehículo, nosotros te ayudamos con el resto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FINANCE_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-cream-soft rounded-[var(--radius)] p-6 shadow-sm border border-gray-300 text-center"
              >
                <benefit.icon className="w-8 h-8 text-blue-light mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold text-blue-light text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-dark-800 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-cream-soft rounded-[var(--radius)] p-6 md:p-8">
            <h3 className="font-semibold text-blue-light mb-3">
              ¿Cómo funciona la financiación?
            </h3>
            <div className="text-sm text-dark-800 leading-relaxed space-y-2">
              <p>
                Podés financiar vehículos usados y 0km a través de créditos
                prendarios con bancos y entidades financieras. El vehículo
                queda como garantía del préstamo, lo que permite acceder a
                tasas competitivas.
              </p>
              <p>
                Nos encargamos de toda la gestión: desde la pre-aprobación
                hasta la firma. Solo necesitás DNI, comprobante de ingresos
                y elegir el vehículo que te gusta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes de Ahorro */}
      <section className="py-12 md:py-16 bg-cream-soft">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
              Planes de Ahorro
            </h2>
            <p className="text-dark-700 max-w-2xl mx-auto">
              Una alternativa para llegar a tu 0km ahorrando mes a mes.
              Los planes de ahorro te permiten acceder a vehículos nuevos
              con cuotas accesibles y la posibilidad de ser adjudicado
              por sorteo o licitación.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {AHORRO_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-cream-soft rounded-[var(--radius)] p-6 shadow-sm border border-gray-300 relative"
              >
                <span className="font-display text-4xl text-blue-light/15 absolute top-4 right-4">
                  {item.step}
                </span>
                <h3 className="font-semibold text-blue-light text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-800 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-cream-soft rounded-[var(--radius)] p-6 md:p-8 shadow-sm border border-gray-300">
            <h3 className="font-semibold text-blue-light mb-3">
              ¿Por qué elegir un plan de ahorro?
            </h3>
            <ul className="text-sm text-dark-800 leading-relaxed space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-light font-bold">•</span>
                <span>
                  Sin requisitos de ingreso mínimo: cualquiera puede
                  suscribirse a un plan.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-light font-bold">•</span>
                <span>
                  Cuotas mensuales que se adaptan al valor del vehículo
                  elegido.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-light font-bold">•</span>
                <span>
                  Posibilidad de licitar para adelantar la entrega de tu
                  vehículo.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-light font-bold">•</span>
                <span>
                  Trabajamos con planes de distintas terminales automotrices.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formulario pre-calificación */}
      <section className="py-12 md:py-16">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
              ¿Calificás para financiación?
            </h2>
            <p className="text-dark-700">
              Completá este breve formulario y te contactamos por WhatsApp con
              las opciones disponibles para vos.
            </p>
          </div>
          <FinanceForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
            ¿Querés saber más?
          </h2>
          <p className="text-dark-700 mb-6">
            Contactanos por WhatsApp y te asesoramos sobre la mejor opción
            de financiación o plan de ahorro para vos.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-deep text-white font-medium px-8 py-3.5 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors text-base"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-wa" />
            Consultá planes y financiación
          </a>
        </div>
      </section>
    </div>
  );
}
