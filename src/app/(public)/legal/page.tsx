import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal y Política de Privacidad — Beast Motors",
  description: "Aviso legal, política de privacidad y condiciones de uso del sitio web de Beast Motors Paraná.",
  robots: { index: false, follow: false },
};

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="font-display text-3xl text-dark-900 mb-2">Aviso Legal y Política de Privacidad</h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: 15 de abril de 2026</p>

      <div className="text-dark-700 space-y-10">

        {/* 1. Titular */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">1. Identificación del titular</h2>
          <p className="text-sm leading-relaxed">
            El presente sitio web es propiedad de <strong>Beast Motors</strong>, concesionaria de vehículos con domicilio en
            Av. Circunvalación José Hernández 2718, E3100 Paraná, Entre Ríos, República Argentina.
          </p>
          <p className="text-sm mt-2">
            Contacto:{" "}
            <a href="https://wa.me/5493436212429" className="text-blue-mid hover:underline">
              WhatsApp 0343 621-2429
            </a>
          </p>
        </section>

        {/* 2. Privacidad */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">2. Política de privacidad</h2>
          <p className="text-sm leading-relaxed">
            Beast Motors respeta la privacidad de sus visitantes y cumple con la{" "}
            <strong>Ley N° 25.326 de Protección de Datos Personales</strong> de la República Argentina y su decreto
            reglamentario N° 1558/2001.
          </p>

          <h3 className="font-semibold text-dark-800 mt-5 mb-2 text-sm">2.1 Datos que recopilamos</h3>
          <p className="text-sm leading-relaxed">
            A través de los formularios de contacto del sitio (pre-calificación de financiación y oferta de vehículos),
            se solicitan datos personales: número de teléfono y dirección de correo electrónico, junto con información
            sobre el interés comercial del visitante.
          </p>
          <p className="text-sm mt-2 leading-relaxed">
            Los formularios generan un mensaje pre-armado que el propio usuario envía desde su dispositivo vía WhatsApp.{" "}
            <strong>En ningún momento los datos transitan por los servidores del sitio web ni son almacenados.</strong>
          </p>

          <h3 className="font-semibold text-dark-800 mt-5 mb-2 text-sm">2.2 Finalidad del tratamiento</h3>
          <p className="text-sm leading-relaxed">Los datos proporcionados son utilizados exclusivamente para:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Responder consultas sobre vehículos y opciones de financiación.</li>
            <li>Brindar asesoramiento comercial personalizado.</li>
            <li>Gestionar el proceso de compra, venta o consignación de vehículos.</li>
          </ul>

          <h3 className="font-semibold text-dark-800 mt-5 mb-2 text-sm">2.3 Cesión de datos a terceros</h3>
          <p className="text-sm leading-relaxed">
            Los datos personales <strong>no son vendidos, cedidos ni compartidos con terceros</strong>, salvo obligación
            legal o requerimiento de autoridad competente.
          </p>
          <p className="text-sm mt-2 leading-relaxed">
            El sitio utiliza servicios de analítica de terceros (Google Analytics y Microsoft Clarity) que pueden
            recopilar datos de navegación de forma anonimizada. Estos servicios cuentan con sus propias políticas de privacidad.
          </p>

          <h3 className="font-semibold text-dark-800 mt-5 mb-2 text-sm">2.4 Derechos del titular (ARCO)</h3>
          <p className="text-sm leading-relaxed">
            En cumplimiento del art. 14 de la Ley 25.326, el titular de los datos tiene derecho a acceder, rectificar,
            suprimir u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>WhatsApp: <strong>0343 621-2429</strong></li>
            <li>Email: <a href="mailto:oficina.jam@gmail.com" className="text-blue-mid hover:underline">oficina.jam@gmail.com</a></li>
          </ul>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            La Dirección Nacional de Protección de Datos Personales tiene atribución para atender denuncias y reclamos
            por incumplimiento de la Ley 25.326.
          </p>
        </section>

        {/* 3. Financiación */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">3. Condiciones de financiación</h2>
          <p className="text-sm leading-relaxed">
            Toda condición de financiación publicada en este sitio es orientativa. Las condiciones definitivas,
            incluyendo el <strong>Costo Financiero Total (CFT)</strong>, están sujetas a aprobación crediticia y se
            informan al momento de la operación, conforme normativa del BCRA y Ley N° 26.993.
          </p>
        </section>

        {/* 4. Cookies */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">4. Uso de cookies</h2>
          <p className="text-sm leading-relaxed">
            Este sitio utiliza cookies propias y de terceros para analizar el tráfico y mejorar la experiencia de
            navegación. Al continuar navegando, el usuario acepta su uso. Las cookies analíticas son gestionadas por
            Google Analytics y Microsoft Clarity.
          </p>
        </section>

        {/* 5. Propiedad intelectual */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">5. Propiedad intelectual</h2>
          <p className="text-sm leading-relaxed">
            El diseño, logotipos, textos e imágenes del sitio son propiedad de Beast Motors o fueron incorporados con
            autorización de sus titulares. Queda prohibida su reproducción total o parcial sin consentimiento expreso.
          </p>
        </section>

        {/* 6. Menores */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">6. Menores de edad</h2>
          <p className="text-sm leading-relaxed">
            Este sitio no está dirigido a menores de 18 años. Beast Motors no recopila intencionalmente datos personales
            de menores. Si se detecta que un menor ha proporcionado datos sin consentimiento parental, serán eliminados
            a la brevedad.
          </p>
        </section>

        {/* 7. Ley aplicable */}
        <section>
          <h2 className="font-semibold text-dark-900 text-lg mb-3">7. Legislación aplicable</h2>
          <p className="text-sm leading-relaxed">
            El presente aviso legal se rige por la legislación vigente en la República Argentina. Para cualquier
            controversia derivada del uso de este sitio, las partes se someten a la jurisdicción de los tribunales
            ordinarios de la ciudad de Paraná, Entre Ríos.
          </p>
        </section>

        {/* Fine print */}
        <div className="border-t border-gray-200 pt-8 mt-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            * Este sitio web tiene carácter exclusivamente informativo y comercial. No constituye una oferta vinculante
            ni una plataforma de comercio electrónico. Los precios publicados son orientativos y pueden variar sin previo
            aviso. Las imágenes son de carácter ilustrativo y la disponibilidad de los vehículos está sujeta a stock.
            Las actividades comerciales de Beast Motors se desarrollan en el marco de la Ley N° 24.240 de Defensa del
            Consumidor. El consumidor tiene derecho a información veraz, adecuada y oportuna.
          </p>
        </div>

      </div>
    </div>
  );
}
