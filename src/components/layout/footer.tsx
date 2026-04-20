import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

const DEV_URL = "https://dancing-haupia-4a3510.netlify.app/";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/logotransparente.png"
              alt="Beast Motors"
              width={160}
              height={55}
              className="h-12 w-auto mb-3"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              Concesionaria multimarca en Paraná, Entre Ríos. Compra, venta
              y consignación de vehículos usados seleccionados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Inicio
              </Link>
              <Link href="/vehiculos" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Vehículos
              </Link>
              <Link href="/motos" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Motos
              </Link>
              <Link href="/next-generation" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Next Generation
              </Link>
              <Link href="/planes" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Planes
              </Link>
              <Link href="/gestoria" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Gestoría
              </Link>
              <Link href="/nosotros" className="text-sm text-gray-300 hover:text-rose transition-colors">
                Nosotros
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
              Contacto
            </h4>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <p>Av. Circunvalación José Hernández 2718</p>
              <p>E3100 Paraná, Entre Ríos</p>
              <p>Tel: 0343 621-2429</p>
              <p>Lun a Vie 8:00 - 14:00</p>
            </div>
            <a
              href="https://www.instagram.com/beastmotors.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-rose transition-colors mt-3"
              aria-label="Instagram de Beast Motors"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              @beastmotors.oficial
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 pb-16 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs text-gray-400">
              © {year} Beast Motors. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/legal"
                className="text-xs text-gray-300 underline underline-offset-2 decoration-gray-500 hover:text-white hover:decoration-white transition-colors"
              >
                Aviso Legal y Privacidad
              </Link>
              <Link
                href="/admin"
                className="text-xs text-gray-300 hover:text-white transition-colors"
                aria-label="Panel de administración"
              >
                Administración
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Diseño y desarrollo:{" "}
            <a
              href={DEV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-light font-medium hover:text-white transition-colors"
            >
              Facundo Cornejo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
