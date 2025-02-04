export function SearchFilters() {
  const filters = [
    { name: "Hoteles", icon: "🏨" },
    { name: "Estadios", icon: "🏟️" },
    { name: "Parques", icon: "🌳" },
    { name: "Restaurantes", icon: "🍽️" },
    { name: "Gimnasios", icon: "💪" },
    { name: "Edificios", icon: "🏢" },
  ]

  return (
    <div className="py-4">
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.name}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50"
          >
            <span className="text-lg">{filter.icon}</span>
            {filter.name}
          </button>
        ))}
      </div>
      <div className="max-w-2xl mx-auto flex">
        <input
          type="search"
          placeholder="Empezá a escribir el nombre de un lugar..."
          className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
        />
        <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-r-md hover:bg-gray-800">
          Buscar
        </button>
      </div>
    </div>
  )
}

