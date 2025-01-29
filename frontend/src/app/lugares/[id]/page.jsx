import Image from "next/image"
import Link from "next/link"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"

export default function LocationDetail({ params }) {
  // En un caso real, estos datos vendrían de una API o base de datos
  const location = {
    id: params.id,
    name: "ESTADIO MAS MONUMENTAL",
    rating: 4,
    reviews: 91218,
    description:
      "Estadio de fútbol y recinto de conciertos; sede del club River Plate y de la Copa Mundial de la FIFA de 1978.",
    features: ["Apto silla de ruedas", "Apto visibilidad reducida", "Apto movilidad reducida"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    reviews: [
      {
        id: 1,
        author: "Marcelo Gallardo",
        rating: 5,
        title: "El mejor estadio del continente",
        content:
          "Lorem ipsum dolor sit amet consectetur. Sem libero hac egestas donec diam in morbi. Ornare ut mi gravida tempus aenean et interdum feugiat tempus. Pellentesque eget duis felis scelerisque volutpat nullam interdum libero lorem. Fermentum id donec mi pretium lectus tincidunt. Arcu faucibus varius pharetra lectus hac quis porta velit ornare.",
      },
      {
        id: 2,
        author: "Marcelo Gallardo",
        rating: 5,
        title: "El mejor estadio del continente",
        content:
          "Lorem ipsum dolor sit amet consectetur. Sem libero hac egestas donec diam in morbi. Ornare ut mi gravida tempus aenean et interdum feugiat tempus. Pellentesque eget duis felis scelerisque volutpat nullam interdum libero lorem. Fermentum id donec mi pretium lectus tincidunt. Arcu faucibus varius pharetra lectus hac quis porta velit ornare.",
      },
      {
        id: 3,
        author: "Marcelo Gallardo",
        rating: 5,
        title: "El mejor estadio del continente",
        content:
          "Lorem ipsum dolor sit amet consectetur. Sem libero hac egestas donec diam in morbi. Ornare ut mi gravida tempus aenean et interdum feugiat tempus. Pellentesque eget duis felis scelerisque volutpat nullam interdum libero lorem. Fermentum id donec mi pretium lectus tincidunt. Arcu faucibus varius pharetra lectus hac quis porta velit ornare.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Galería y mapa */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Miniaturas */}
            <div className="hidden lg:flex lg:col-span-1 flex-col gap-4">
              {location.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Foto ${index + 2}`}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 right-0 bg-white px-2 py-1 text-sm">{42}</div>
                </div>
              ))}
            </div>

            {/* Foto principal */}
            <div className="lg:col-span-7 relative aspect-[4/3]">
              <Image
                src={location.images[0] || "/placeholder.svg"}
                alt={location.name}
                fill
                className="object-cover rounded-md"
              />
            </div>

            {/* Mapa */}
            <div className="lg:col-span-4 bg-gray-100 rounded-md p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-sm">CAPTURA DE LA UBICACION. AL CLICKEAR DEBE LLEVARNOS A GOOGLE MAPS</p>
              </div>
            </div>
          </div>

          {/* Información del lugar */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{location.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {"★".repeat(location.rating)}
                    {"☆".repeat(5 - location.rating)}
                  </div>
                  <span className="text-gray-600">{location.reviews.length} Reseñas</span>
                </div>
                <p className="text-gray-600">{location.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">❤️</button>
                <button className="p-2 hover:bg-gray-100 rounded-full">🔖</button>
              </div>
            </div>

            {/* Características de accesibilidad */}
            <div className="flex flex-wrap gap-4 mb-4">
              {location.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span>✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">PUBLICAR RESEÑA</button>
          </div>

          {/* Reseñas */}
          <div className="space-y-8">
            {location.reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{review.author}</h3>
                  <div className="flex mb-1">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-600">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

