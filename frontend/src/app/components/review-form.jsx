"use client"

import { useState } from "react"
import Image from "next/image"

export function ReviewForm({ locationId }) {
  const [rating, setRating] = useState(0)
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const accessibilityFeatures = [
    "Apto silla de ruedas",
    "Apto silla de ruedas",
    "Apto silla de ruedas",
    "Apto silla de ruedas",
    "Apto silla de ruedas",
    "Apto silla de ruedas",
    "Apto silla de ruedas",
    "Apto silla de ruedas",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la reseña
    console.log("Formulario enviado")
  }

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Columna izquierda - Imagen */}
      <div className="relative aspect-square bg-gray-100">
        <Image src="/placeholder.svg" alt="Imagen del lugar" fill className="object-cover" />
      </div>

      {/* Columna derecha - Formulario */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Contanos como te fue en
              <br />
              ESTADIO MAS MONUMENTAL
            </h1>
          </div>

          {/* Calificación */}
          <div>
            <h2 className="text-lg font-medium mb-2">¿Como calificarías tu experiencia?</h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${rating >= star ? "text-black" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Fecha de visita */}
          <div>
            <h2 className="text-lg font-medium mb-2">¿Cuando fuiste?</h2>
            <select className="w-full p-2 border rounded-md">
              <option>Enero 2025</option>
              <option>Diciembre 2024</option>
              <option>Noviembre 2024</option>
            </select>
          </div>

          {/* Características de accesibilidad */}
          <div>
            <h2 className="text-lg font-medium mb-2">Marcá las etiquetas que consideres correctas</h2>
            <div className="grid grid-cols-2 gap-2">
              {accessibilityFeatures.map((feature, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="w-4 h-4"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opinión */}
          <div>
            <h2 className="text-lg font-medium mb-2">Escribí tu opinión</h2>
            <textarea
              className="w-full p-3 border rounded-md min-h-[200px]"
              placeholder="Evitá usar insultos, escribir todo en MAYÚSCULAS, incluir información personal como correos electrónicos, dirección o números de teléfono."
            />
          </div>

          {/* Título de la opinión */}
          <div>
            <h2 className="text-lg font-medium mb-2">Título de tu opinión</h2>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>

          {/* Términos y condiciones */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="terms">Acepto términos y condiciones</label>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!acceptedTerms || rating === 0}
            className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium"
          >
            PUBLICAR RESEÑA
          </button>
        </form>
      </div>
    </div>
  )
}

