import { Button } from "../components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">Construyamos juntos un mundo más accesible.</h1>
        <p className="text-gray-600 text-lg">
          Explora, califica y comparte lugares accesibles. Unite a nuestra comunidad y ayudanos a lograr que cada rincón
          del mundo sea inclusivo y esté al alcance de todos.
        </p>
        <Button variant="primary" size="large">
          ¡UNITE Y HACÉ LA DIFERENCIA!
        </Button>
      </div>
      <div className="relative aspect-square">
        <Image src="/placeholder.svg" alt="Ilustración" fill className="object-cover rounded-lg" />
      </div>
    </div>
  )
}

