import SellForm from "./sell-form";

export default function SellSection() {
  return (
    <section className="py-12 md:py-16 bg-cream-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:flex items-start gap-12">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-900 mb-3">
              ¿Querés vender tu auto?
            </h2>
            <p className="text-dark-600 leading-relaxed">
              Recibimos tu usado como parte de pago. También podemos ayudarte a
              venderlo en consignación. Completá el formulario y te contactamos
              con una tasación sin compromiso.
            </p>
          </div>
          <div className="shrink-0">
            <SellForm />
          </div>
        </div>
      </div>
    </section>
  );
}
