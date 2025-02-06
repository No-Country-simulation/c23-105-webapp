import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { SearchFilters } from "./components/search-filters"
import { SearchSection } from "./components/search-section"
import { LocationCards } from "./components/location-cards"
import { AboutUs } from "./components/about-us"
import { FaqSection } from "./components/faq-section"
import { ContactForm } from "./components/contact-form"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchSection />
        <Hero />
        <LocationCards />
        <AboutUs />
        <FaqSection />
        <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

