export function Search({ placeholder = "Buscar...", className = "", ...props }) {
  return (
    <div className="relative">
      <input
        type="search"
        className={`w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:border-primary ${className}`}
        placeholder={placeholder}
        {...props}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
    </div>
  )
}

