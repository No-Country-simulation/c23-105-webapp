import Link from "next/link"

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold hover:text-gray-600 transition-colors">
            ADAPPTADO LOGOTIPO
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#" className="text-sm font-medium">
              Quienes somos
            </Link>
            <Link href="#" className="text-sm font-medium">
              Preguntas Frecuentes
            </Link>
            <Link href="#" className="text-sm font-medium">
              Contacto
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">
              INICIAR SESIÓN
            </Link>
            <Link
              href="/registro"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            >
              REGISTRARSE
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

