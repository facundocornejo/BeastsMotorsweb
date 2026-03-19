import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-bg px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-blue-deep mb-4">
          404
        </h1>
        <p className="text-lg text-dark-600 mb-6">
          La página que buscás no existe
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-deep text-white font-medium px-6 py-3 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
