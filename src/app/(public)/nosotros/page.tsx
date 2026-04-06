import type { Metadata } from "next";
import { buildGeneralWhatsAppLink, buildAppointmentWhatsAppLink } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Beast Motors — Concesionaria multimarca en Paraná, Entre Ríos. Compra, venta y consignación de autos usados seleccionados, camionetas y vehículos 0km.",
};

export default function NosotrosPage() {
  const waLink = buildGeneralWhatsAppLink();
  const appointmentLink = buildAppointmentWhatsAppLink();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-900 mb-6">
        Sobre Beast Motors
      </h1>

      <div className="prose max-w-none">
        <div className="text-dark-600 leading-relaxed space-y-4 mb-8">
          <p>
            En Beast Motors somos una concesionaria multimarca ubicada sobre
            Av. Circunvalación José Hernández en Paraná, Entre Ríos. Nos
            especializamos en la compra, venta y consignación de vehículos
            usados seleccionados de gama media y alta, con foco en camionetas
            y autos de modelos recientes.
          </p>
          <p>
            Nuestro objetivo es ofrecer una experiencia de compra segura, clara
            y sin complicaciones. Para eso, trabajamos con una selección cuidada
            de unidades, priorizando el estado real de cada vehículo y la
            transparencia en toda la información. Cada auto es revisado antes de
            ser publicado, para que tomes decisiones con confianza.
          </p>
          <p>Contamos con una estructura que respalda cada operación:</p>
          <ul className="list-disc pl-5 space-y-2 text-dark-700">
            <li>
              <strong className="text-blue-light">Respaldo legal:</strong> la empresa está dirigida por un
              profesional del derecho, lo que garantiza operaciones correctamente
              documentadas y seguras.
            </li>
            <li>
              <strong className="text-blue-light">Gestoría automotor propia:</strong> gestionamos
              internamente transferencias y trámites, agilizando los procesos y
              evitando intermediarios.
            </li>
            <li>
              <strong className="text-blue-light">Transparencia y control:</strong> verificamos
              documentación, historial y condiciones de cada unidad.
            </li>
            <li>
              <strong className="text-blue-light">Atención personalizada:</strong> acompañamos a cada
              cliente durante todo el proceso de compra.
            </li>
          </ul>
          <p>
            Además, ofrecemos asesoramiento en financiación y la posibilidad de
            tomar tu vehículo como parte de pago.
          </p>
          <p>
            En Beast Motors entendemos que comprar un vehículo es una decisión
            importante, por eso trabajamos para que lo hagas con tranquilidad,
            respaldo y confianza.
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-cream-soft rounded-[var(--radius)] p-6 shadow-sm border border-gray-300">
          <h3 className="font-semibold text-blue-light text-lg mb-3">Horarios</h3>
          <div className="text-sm text-dark-800 space-y-1">
            <p>Lunes a Viernes: 8:00 - 14:00</p>
            <p>Sábados y Domingos: Cerrado</p>
          </div>
          <div className="mt-4 bg-rose/10 border-l-4 border-rose rounded-r-[var(--radius-sm)] p-3">
            <p className="text-sm text-dark-900 font-medium mb-1">
              ¿No podés en este horario?
            </p>
            <p className="text-xs text-dark-800 mb-2">
              Agendá una cita previa y te atendemos en el horario que necesites.
            </p>
            <a
              href={appointmentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-rose hover:text-rose-dark transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-wa" />
              Agendar cita por WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-cream-soft rounded-[var(--radius)] p-6 shadow-sm border border-gray-300">
          <h3 className="font-semibold text-blue-light text-lg mb-3">Ubicación</h3>
          <div className="text-sm text-dark-800 space-y-1">
            <p>Av. Circunvalación José Hernández 2718</p>
            <p>E3100 Paraná, Entre Ríos</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-[var(--radius)] overflow-hidden h-64 md:h-80 mb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424.09961944944047!2d-60.4827404022217!3d-31.748742728774832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b44f3f00df5e8b%3A0xc30a12adf7e37758!2sBEAST%20MOTORS%20PARANA!5e0!3m2!1ses-419!2sar!4v1773934822217!5m2!1ses-419!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Beast Motors"
        />
      </div>

      <div className="text-center">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-deep text-white font-medium px-6 py-3 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-green-wa" />
          Contactanos por WhatsApp
        </a>
      </div>
    </div>
  );
}
