import Image from "next/image"
import Link from "next/link"

export function LocationCards() {
  const locations = [
    {
      id: 1,
      title: "ESTADIO MÁS MONUMENTAL",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
    },
    {
      id: 2,
      title: "ESTADIO MÁS MONUMENTAL",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
    },
    {
      id: 3,
      title: "HOTEL HILTON TUCUMAN",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
    },
    {
      id: 4,
      title: "POLIDEPORTIVO MUNICIPAL MONTEROS",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prototipo-SJObkjYf4dVB5g4mTWG9LGIjYl6gNk.png",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...",
    },
  ]

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">CONOCÉ LUGARES INDICADOS PARA VOS</h2>
        <Link href="/lugares/new/review" className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">
          PUBLICAR RESEÑA
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {locations.map((location) => (
          <div key={location.id} className="rounded-lg border bg-white shadow-sm">
            <div className="p-2 border-b">
              <span className="text-sm font-medium text-gray-600">Estadio</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-4">{location.title}</h3>
              <div className="aspect-video relative mb-4">
                <Image src={location.image || "/placeholder.svg"} alt="" fill className="object-cover rounded-md" />
              </div>
              <p className="text-sm text-gray-500 mb-4">{location.description}</p>
              <Link
                href={`/lugares/${location.id}`}
                className="block w-full px-4 py-2 text-sm font-medium text-center border rounded-md hover:bg-gray-50"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">
          Explorá más lugares que pueden interesarte
        </button>
      </div>
    </section>
  )
}

