"use client";

import { useState } from "react";
import Link from "next/link";
import { buildFinanceWhatsAppLink } from "@/lib/utils/whatsapp";
import FinanceForm from "@/components/planes/finance-form";

export default function FinanceSection() {
  const [showForm, setShowForm] = useState(false);
  const waLink = buildFinanceWhatsAppLink();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-cream rounded-[var(--radius)] p-8 md:p-12">
          {!showForm ? (
            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-3">
                Financiamos tu compra
              </h2>
              <p className="text-dark-600 max-w-xl mx-auto mb-6">
                Tenemos las mejores opciones de financiación y planes de ahorro
                para que te lleves tu vehículo hoy. Consultanos y armamos un plan
                a tu medida.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-deep text-white font-medium px-6 py-3 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-wa" />
                  Consultá financiación
                </a>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-rose text-white font-medium px-6 py-3 rounded-[var(--radius-sm)] hover:bg-rose-dark transition-colors"
                >
                  Quiero pre-calificarme
                </button>
              </div>
              <Link
                href="/planes"
                className="text-sm font-medium text-blue-deep hover:text-blue-mid transition-colors"
              >
                Conocé nuestros planes →
              </Link>
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-dark-600 hover:text-dark-900 transition-colors mb-6 flex items-center gap-1"
              >
                ← Volver
              </button>
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl text-dark-900 mb-2">
                  ¿Calificás para financiación?
                </h2>
                <p className="text-dark-600">
                  Completá el formulario y te contactamos con las opciones disponibles para vos.
                </p>
              </div>
              <FinanceForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
