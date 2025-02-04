export function ContactForm() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold text-center mb-8">CONTACTATE CON NOSOTROS</h2>
      <form className="max-w-2xl mx-auto space-y-4">
        <input type="email" placeholder="Correo electrónico" required className="w-full px-3 py-2 border rounded-md" />
        <textarea
          placeholder="Envía tu mensaje"
          required
          className="w-full min-h-[150px] px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
        >
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}

