import Image from "next/image"

export function Card({ title, image, description, rating, category, action, className = "" }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm overflow-hidden ${className}`}>
      {category && (
        <div className="p-2 border-b">
          <span className="text-sm font-medium text-gray-600">{category}</span>
        </div>
      )}
      <div className="p-4">
        {title && <h3 className="font-bold mb-4">{title}</h3>}
        {image && (
          <div className="aspect-video relative mb-4">
            <Image src={image || "/placeholder.svg"} alt={title || ""} fill className="object-cover rounded-md" />
          </div>
        )}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? "text-primary" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
        )}
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        {action}
      </div>
    </div>
  )
}

