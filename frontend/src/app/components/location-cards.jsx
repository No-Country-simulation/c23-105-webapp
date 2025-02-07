import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export function LocationCards() {
  const locations = [
    {
      id: 1,
      title: "ESTADIO MAS MONUMENTAL",
      category: "Estadio",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-TCpX1wQ9VGawnPiry7Aq3kJXU0gz3B.png",
      description:
        "Estadio de fútbol y recinto de conciertos; sede del club River Plate y de la Copa Mundial de la FIFA de 1978.",
      accessibilityFeatures: 4,
    },
    {
      id: 2,
      title: "ESTADIO MÁS MONUMENTAL",
      category: "Estadio",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
      accessibilityFeatures: 3,
    },
    {
      id: 3,
      title: "HOTEL HILTON TUCUMAN",
      category: "Hotel",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
      accessibilityFeatures: 5,
    },
    {
      id: 4,
      title: "POLIDEPORTIVO MUNICIPAL MONTEROS",
      category: "Polideportivo",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
      accessibilityFeatures: 2,
    },
  ]

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">CONOCÉ LUGARES INDICADOS PARA VOS</h2>
      <Link href="/lugares/new/review">
        <Button variant="secondary" >
          PUBLICAR RESEÑA</Button>
      </Link>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <div className="absolute top-4 left-4 px-4 py-1 bg-[#004f73] text-white rounded-full text-sm">
                {location.category}
              </div>
              <div className="aspect-[4/3] relative">
                <Image src={location.image || "/placeholder.svg"} alt={location.title} fill className="object-cover" />
              </div>
            </div>

            <div className="p-6 bg-[#faf3e0]">
              <h3 className="font-bold text-xl mb-2">{location.title}</h3>

              <div className="flex gap-2 mb-4">
                {Array.from({ length: location.accessibilityFeatures }).map((_, i) => (
                  <span key={i} className="text-[#004f73] text-2xl">
                    ♿
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-6">{location.description}</p>

              <Link
                href={`/lugares/${location.id}`}
                className="block w-full text-center px-6 py-3 bg-[#004f73] text-white rounded-xl hover:bg-[#004f73]/90 transition-colors"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

