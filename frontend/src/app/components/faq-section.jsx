export function FaqSection() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold text-center mb-8">PREGUNTAS FRECUENTES</h2>
      <div className="w-full max-w-2xl mx-auto divide-y">
        <details className="group py-4">
          <summary className="flex cursor-pointer items-center justify-between font-medium">
            ¿Como hago para escribir una reseña?
            <span className="transition-transform duration-200 group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-4 text-gray-500">
            Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
            cloud meggings four neutra.
          </p>
        </details>
        <details className="group py-4">
          <summary className="flex cursor-pointer items-center justify-between font-medium">
            ¿Como hago para escribir una reseña?
            <span className="transition-transform duration-200 group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-4 text-gray-500">
            Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
            cloud meggings four neutra.
          </p>
        </details>
        <details className="group py-4">
          <summary className="flex cursor-pointer items-center justify-between font-medium">
            ¿Como hago para escribir una reseña?
            <span className="transition-transform duration-200 group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-4 text-gray-500">
            Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
            cloud meggings four neutra.
          </p>
        </details>
      </div>
    </section>
  )
}

