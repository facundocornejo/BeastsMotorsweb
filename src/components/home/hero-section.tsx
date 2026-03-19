import HeroSearch from "./hero-search";

export default function HeroSection() {
  return (
    <section className="bg-blue-deep text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Tu próximo vehículo
          <br />
          <span className="text-white/90">está acá</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Autos usados, 0km, motos y vehículos importados en Paraná, Entre Ríos
        </p>
        <div className="flex justify-center">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
