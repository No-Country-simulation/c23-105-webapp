import Image from "next/image"
import Link from "next/link"
import { Button } from "../components/ui/button"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Columna izquierda - Ilustración */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
        <div className="relative w-full h-full">
          <Image src="/placeholder.svg" alt="Ilustración" fill className="object-cover" />
        </div>
      </div>

      {/* Columna derecha - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">CREÁ TU CUENTA</h1>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="nombres" className="block text-sm font-medium">
                Nombre (s)
              </label>
              <input
                id="nombres"
                name="nombres"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label htmlFor="apellidos" className="block text-sm font-medium">
                Apellido (s)
              </label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <Button type="submit" className="w-full py-3 px-4">
              CREÁ TU CUENTA
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm">
              ¿Ya tenés una cuenta?{" "}
              <Link href="/login" className="font-medium hover:underline">
                Iniciá sesión
              </Link>
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <span className="text-xl">G</span>
            REGISTRATE CON GOOGLE
          </button>
        </div>
      </div>
    </div>
  )
}

