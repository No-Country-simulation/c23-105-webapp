import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { ReviewForm } from "@/app/components/review-form"

export default function PublishReviewPage({ params }) {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReviewForm locationId={params.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

