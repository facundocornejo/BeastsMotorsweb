import Link from "next/link";
import { buildAppointmentWhatsAppLink } from "@/lib/utils/whatsapp";

export default function AboutSection() {
  const appointmentLink = buildAppointmentWhatsAppLink();
  return (
    <section className="py-12 md:py-16 bg-cream-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:flex gap-8">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-900 mb-3">
              Sobre Beast Motors
            </h2>
            <p className="text-dark-600 leading-relaxed mb-4">
              Concesionaria multimarca en Paraná, Entre Ríos. Compra, venta y
              consignación de vehículos usados seleccionados de gama media y
              alta. Atención personalizada, financiación y transparencia en
              cada operación.
            </p>
            <div className="text-sm text-dark-600 mb-4">
              <p className="font-medium">Horarios de atención:</p>
              <p>Lunes a Viernes: 8:00 - 14:00</p>
              <p>Sábados y Domingos: Cerrado</p>
              <div className="mt-2 bg-rose/10 border-l-4 border-rose rounded-r-[var(--radius-sm)] p-2">
                <p className="text-xs text-dark-900">
                  ¿Otro horario?{" "}
                  <a
                    href={appointmentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-rose hover:text-rose-dark transition-colors"
                  >
                    Agendá una cita previa →
                  </a>
                </p>
              </div>
            </div>
            <Link
              href="/nosotros"
              className="text-sm font-medium text-blue-deep hover:text-blue-mid transition-colors"
            >
              Conocé más sobre nosotros →
            </Link>
          </div>

          {/* Map */}
          <div className="flex-1">
            <div className="rounded-[var(--radius)] overflow-hidden h-64 md:h-full min-h-[250px] bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424.09961944944047!2d-60.4827404022217!3d-31.748742728774832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b44f3f00df5e8b%3A0xc30a12adf7e37758!2sBEAST%20MOTORS%20PARANA!5e0!3m2!1ses-419!2sar!4v1773934822217!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Beast Motors - Paraná, Entre Ríos"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
