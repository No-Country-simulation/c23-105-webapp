import { Search } from "../components/ui/search"
import { Button } from "../components/ui/button"

export function SearchSection() {
  const filters = [
    { icon: "🏨", label: "Hoteles" },
    { icon: "🏟️", label: "Estadios" },
    { icon: "🌳", label: "Parques" },
    { icon: "🍽️", label: "Restaurantes" },
    { icon: "💪", label: "Gimnasios" },
    { icon: "🏢", label: "Edificios" },
  ]

  return (
    <div className="py-8">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {filters.map((filter) => (
          <Button key={filter.label} variant="ghost" className="flex items-center gap-2">
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
          </Button>
        ))}
      </div>
      <div className="max-w-2xl mx-auto">
        <Search placeholder="Empezá a escribir el nombre de un lugar..." className="w-full" />
      </div>
    </div>
  )
}

