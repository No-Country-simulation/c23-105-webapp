export function Button({ children, variant = "primary", size = "medium", className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors"

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "border-2 border-primary text-primary hover:bg-primary/10",
    tertiary: "text-primary hover:bg-primary/10",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  }

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

