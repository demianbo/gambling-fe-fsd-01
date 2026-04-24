import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { LandingHero } from './components/landing-hero'

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <LandingHero />
      </main>
      <Footer />
    </div>
  )
}
