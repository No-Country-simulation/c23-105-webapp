export function AboutUs() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold text-center mb-12">¿QUIENES SOMOS?</h2>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Nuestra misión</h3>
          <p className="text-gray-500">
            Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
            cloud meggings four neutra. Try-hard vegan squid kale godard unicorn iPhone. Next sartorial portland godard
            beer readymade single-origin vintage fixie stumptown book selvage.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Nuestra visión</h3>
          <p className="text-gray-500">
            Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
            cloud meggings four neutra. Try-hard vegan squid kale godard unicorn iPhone.
          </p>
          <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">
            COMPARTÍ PARA CREAR COMUNIDAD
          </button>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200">
          COLABORA CON NOSOTROS
        </button>
      </div>
    </section>
  )
}

