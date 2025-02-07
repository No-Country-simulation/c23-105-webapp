import Image from "next/image"
import logo from "../assets/logofooter.png"
import ig from "../assets/ig.svg"
import ws from "../assets/ws.svg"
import email from "../assets/email.svg"
export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Adapptado Logo" width={285} height={86} />
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="https://instagram.com/adapptado" className="flex items-center gap-2">
            <Image src={ig} alt="Instagram"/>
              <span>@adapptado</span>
            </a>
            <a href="tel:+543815014082" className="flex items-center gap-2">
              <Image src={ws} alt="Whatsapp"/>
              <span>+54 381 5014 082</span>
            </a>
            <a href="mailto:adapptado@gmail.com" className="flex items-center gap-2">
              <Image src={email} alt="Email"/>
              <span>adapptado@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

