import Link from "next/link"
import { Button } from "../components/ui/button"
import Image from "next/image"
import logo from "../assets/logoheader.png"

export function Header() {
  return (
    <header className="bg-secondary-accent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Adapptado Logo"  width={285} height={86} />
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="#" className="text-sm text-gray-600 hover:text-primary">
              Quienes somos
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-primary">
              Preguntas frecuentes
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-primary">
              Contacto
            </Link>
          </nav>
          <div className="flex gap-4">
          <Link  href="/login">
          <Button  variant="primary"  size="small">
          Iniciar sesión
          </Button>
          </Link>
            <Link href="/registro">
            <Button variant="primary" size="small" >
              Registrarse
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

