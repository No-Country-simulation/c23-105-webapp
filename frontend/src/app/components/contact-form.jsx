import { Button } from "../components/ui/button"

export function ContactForm() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">CONTACTATE CON NOSOTROS</h2>
      <form className="max-w-2xl mx-auto space-y-6">
        <input type="email" placeholder="Correo electrónico" className="w-full p-3 border rounded-md" required />
        <textarea placeholder="Envía tu mensaje" className="w-full p-3 border rounded-md min-h-[200px]" required />
        <Button type="submit" variant="primary" className="w-full">
          Enviar mensaje
        </Button>
      </form>
    </section>
  )
}

