import type { Metadata } from "next";
import {
  ArrowLeftRight,
  ShieldCheck,
  FileSearch,
  MapPin,
  Scale,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { buildGestoriaWhatsAppLink } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "Gestoría Automotor — Beast Motors Paraná",
  description:
    "Gestoría automotor propia en Paraná, Entre Ríos. Transferencias, informes de dominio, radicaciones y más. Sin intermediarios.",
};

const SERVICES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ArrowLeftRight,
    title: "Transferencias vehiculares",
    description:
      "Gestionamos la transferencia de tu vehículo de forma completa, asegurándonos de que toda la documentación esté en regla.",
  },
  {
    icon: ShieldCheck,
    title: "Verificación de documentación",
    description:
      "Controlamos títulos, cédulas y toda la documentación del vehículo antes de cualquier operación.",
  },
  {
    icon: FileSearch,
    title: "Informes de dominio",
    description:
      "Solicitamos informes de dominio para verificar la situación legal y registral del vehículo.",
  },
  {
    icon: MapPin,
    title: "Trámites de radicación",
    description:
      "Gestionamos cambios de radicación entre jurisdicciones de forma ágil y sin complicaciones.",
  },
  {
    icon: Scale,
    title: "Gestión de multas y deudas",
    description:
      "Te ayudamos a resolver multas, infracciones y deudas asociadas al vehículo antes de la compra o venta.",
  },
  {
    icon: MessageCircle,
    title: "Asesoramiento integral",
    description:
      "Te orientamos en cualquier duda sobre trámites registrales, documentación o situación legal de tu vehículo.",
  },
];

const ADVANTAGES = [
  {
    title: "Sin intermediarios",
    description:
      "Nuestra gestoría es interna, lo que significa que no dependés de terceros. Todo se gestiona dentro de Beast Motors.",
  },
  {
    title: "Agilidad en los trámites",
    description:
      "Al ser parte de la concesionaria, los trámites se inician de forma inmediata junto con la operación de compra-venta.",
  },
  {
    title: "Para clientes y no clientes",
    description:
      "No hace falta que compres un vehículo con nosotros. El servicio de gestoría está disponible para cualquier persona.",
  },
];

export default function GestoriaPage() {
  const waLink = buildGestoriaWhatsAppLink();

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-deep text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-light mb-3">
            Beast Motors
          </p>
          <h1 className="font-display text-3xl md:text-5xl mb-4">
            Gestoría Automotor
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Contamos con gestoría automotor propia para que todos tus trámites
            se resuelvan en un solo lugar, sin intermediarios y con total
            confianza.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
              Nuestros servicios
            </h2>
            <p className="text-dark-700 max-w-2xl mx-auto">
              Nos encargamos de toda la gestión registral de tu vehículo.
              Desde transferencias hasta informes de dominio, todo resuelto
              de forma profesional y transparente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-cream-soft rounded-[var(--radius)] p-6 shadow-sm border border-gray-300"
              >
                <service.icon className="w-8 h-8 text-blue-light mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold text-blue-light mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-dark-800 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 md:py-16 bg-cream-soft">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-8 text-center">
            ¿Por qué hacer la gestoría con nosotros?
          </h2>

          <div className="space-y-6">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className="bg-[var(--white)] rounded-[var(--radius)] p-6 shadow-sm border border-gray-200 border-l-4 border-l-blue-light"
              >
                <h3 className="font-bold text-base text-blue-light mb-1">
                  {adv.title}
                </h3>
                <p className="text-sm text-dark-900 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
            ¿Necesitás gestionar un trámite?
          </h2>
          <p className="text-dark-700 mb-6">
            Escribinos por WhatsApp y te asesoramos sobre el trámite que
            necesitás. Atendemos consultas de clientes y no clientes.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-deep text-white font-medium px-8 py-3.5 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors text-base"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-wa" />
            Consultar gestoría
          </a>
        </div>
      </section>
    </div>
  );
}
