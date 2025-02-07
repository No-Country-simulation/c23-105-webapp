import { Button } from "../components/ui/button"
import Image from "next/image"

export function AboutUs() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-16">¿QUIENES SOMOS?</h2>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="relative aspect-square">
            <Image src="/placeholder.svg" alt="" fill className="object-cover rounded-lg" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Nuestra misión</h3>
            <p className="text-gray-600">
              Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
              cloud meggings four neutra. Try-hard vegan squid kale godard unicorn iPhone.
            </p>
            <div className="text-center">
              <p className="text-sm text-gray-500 italic">----Idea: se podría pedir donaciones en un futuro------</p>
              <Button variant="secondary">COLABORA CON NOSOTROS</Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Nuestra visión</h3>
            <p className="text-gray-600">
              Hipster ipsum tattooed brunch I'm baby. Four green everyday pour-over level vegan kitch. Truffaut whatever
              cloud meggings four neutra. Try-hard vegan squid kale godard unicorn iPhone.
            </p>
            <Button variant="primary">Compartí para crear comunidad</Button>
          </div>
          <div className="relative aspect-square">
            <Image src="/placeholder.svg" alt="" fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

