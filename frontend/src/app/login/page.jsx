import Image from "next/image"
import Link from "next/link"
import { Button } from "../components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Columna izquierda - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">INICIÁ SESIÓN</h1>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Mantener sesión
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="hover:underline">
                  Olvidé mi contraseña
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full" variant="primary" >
            INICIAR SESIÓN
            </Button>
            
          </form>

          <div className="text-center">
            <p className="text-sm">
              ¿Todavía no tenés una cuenta?{" "}
              <Link href="/registro" className="font-medium hover:underline">
                Creá tu cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Columna derecha - Ilustración */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
        <div className="relative w-full h-full">
          <Image src="/placeholder.svg" alt="Ilustración" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

