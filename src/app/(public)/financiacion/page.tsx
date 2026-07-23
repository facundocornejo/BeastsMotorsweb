import { Wallet, Zap, Handshake, type LucideIcon } from "lucide-react";
import { buildPlanesWhatsAppLink } from "@/lib/utils/whatsapp";
import FinanceForm from "@/components/planes/finance-form";
import PaymentLogos from "@/components/ui/payment-logos";
import { pageMetadata, faqJsonLd } from "@/lib/utils/seo";
import JsonLd from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "Financiación y Planes de Ahorro — Beast Motors Paraná",
  description:
    "Financiá tu auto o moto hasta en 24 cuotas con tarjeta Visa, Amex, Naranja o Sidecreer, préstamos con DNI y planes de ahorro. Beast Motors, Paraná, Entre Ríos.",
  path: "/financiacion",
});

const FAQS: { question: string; answer: string }[] = [
  {
    question: "¿Cómo funciona la financiación?",
    answer:
      "Podés financiar vehículos usados y 0km a través de créditos prendarios con bancos y entidades financieras. El vehículo queda como garantía del préstamo, lo que permite acceder a tasas competitivas. Nos encargamos de toda la gestión: desde la pre-aprobación hasta la firma. Solo necesitás DNI, comprobante de ingresos y elegir el vehículo que te gusta.",
  },
  {
    question: "¿Qué tarjetas de crédito aceptan?",
    answer:
      "Visa y American Express de cualquier banco (hasta 24 cuotas con tarjeta física), Tarjeta Naranja con Plan Z y Sidecreer.",
  },
  {
    question: "¿En cuántas cuotas puedo pagar?",
    answer:
      "Hasta 24 cuotas con tarjeta Visa o American Express física. Las cuotas y condiciones vigentes se confirman por WhatsApp al momento de la consulta.",
  },
  {
    question: "¿Puedo financiar solo con mi DNI?",
    answer:
      "Sí. Con Credicuotas accedés a un préstamo presentando solo tu DNI. Para motos también está Crédito Argentino, que pide DNI e ingresos demostrables: recibo de sueldo, jubilación o monotributo.",
  },
  {
    question: "¿Qué necesito para un crédito prendario?",
    answer:
      "DNI y comprobante de ingresos. El vehículo queda como garantía del préstamo, lo que permite acceder a mejores condiciones. Nos encargamos de toda la gestión, de la pre-aprobación a la firma.",
  },
];

const FINANCING_OPTIONS: {
  title: string;
  options: { name: string; detail: string }[];
}[] = [
  {
    title: "Autos",
    options: [
      { name: "Visa y American Express", detail: "hasta 24 cuotas con tarjeta física, de cualquier banco" },
      { name: "Tarjeta Naranja", detail: "Plan Z" },
      { name: "Sidecreer", detail: "para clientes de la tarjeta" },
      { name: "Credicuotas", detail: "préstamo solo con DNI" },
      { name: "San Cristóbal", detail: "préstamo prendario o personal" },
      { name: "Financiación particular", detail: "unidades propias, con garantía" },
    ],
  },
  {
    title: "Motos",
    options: [
      { name: "Visa y American Express", detail: "hasta 24 cuotas con tarjeta física, de cualquier banco" },
      { name: "Tarjeta Naranja", detail: "Plan Z" },
      { name: "Sidecreer", detail: "para clientes de la tarjeta" },
      { name: "Credicuotas", detail: "préstamo solo con DNI" },
      { name: "Crédito Argentino", detail: "solo DNI, con ingresos demostrables (sueldo, jubilación o monotributo)" },
      { name: "Plan de ahorro Beast Motors", detail: "consultá unidades disponibles" },
    ],
  },
];

const FINANCE_BENEFITS: { icon: LucideIcon; title: string }[] = [
  { icon: Wallet, title: "Cuotas accesibles" },
  { icon: Zap, title: "Aprobación rápida" },
  { icon: Handshake, title: "Asesoramiento personalizado" },
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
      <JsonLd data={faqJsonLd(FAQS)} />
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

      {/* Medios de financiación */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
              Medios de financiación
            </h2>
            <p className="text-dark-700 max-w-2xl mx-auto">
              Comprá tu vehículo hasta en 24 cuotas con tarjeta, préstamos
              personales solo con DNI o financiación directa de Beast Motors.
            </p>
          </div>

          <PaymentLogos size="md" className="mb-10 max-w-3xl mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FINANCING_OPTIONS.map((group) => (
              <div
                key={group.title}
                className="bg-cream-soft rounded-[var(--radius)] p-6 shadow-sm border border-gray-300"
              >
                <h3 className="font-semibold text-blue-light text-lg mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.options.map((option) => (
                    <li key={option.name} className="flex gap-2 text-sm leading-relaxed">
                      <span className="text-blue-light font-bold">•</span>
                      <span className="text-dark-800">
                        <span className="font-semibold text-dark-900">{option.name}</span>
                        {" — "}
                        {option.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-sm text-dark-700 text-center mt-6">
            Las cuotas y condiciones vigentes se confirman por WhatsApp al momento
            de la consulta.
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

          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {FINANCE_BENEFITS.map((benefit) => (
              <li key={benefit.title} className="flex items-center gap-2">
                <benefit.icon className="w-5 h-5 text-blue-light" strokeWidth={1.5} />
                <span className="text-sm font-medium text-dark-900">{benefit.title}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-3xl mx-auto">
            <h3 className="font-semibold text-dark-900 text-lg mb-4 text-center">
              Preguntas frecuentes
            </h3>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-cream-soft rounded-[var(--radius)] border border-gray-300"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 font-semibold text-blue-light list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light rounded-[var(--radius)]">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="text-dark-600 transition-transform group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm text-dark-800 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
