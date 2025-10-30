import { Navigation } from '../components/navigation'
import { Header } from '../components/header'
import { Features } from '../components/features'
import { Footer } from '../components/footer'

import { ConfettiAnimation } from '@/components/confetti-animation'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-purple-50 to-pink-50">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 max-w-5xl mx-auto w-full">
        <Header />
        <Features />
      </main>

      <ConfettiAnimation enabled={true} infinite={false} />
      <Footer />
    </div>
  )
}
