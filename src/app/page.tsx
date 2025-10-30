'use client'

import { Navigation } from '../components/navigation'
import { Header } from '../components/header'
import { Features } from '../components/features'
import { Footer } from '../components/footer'
import { ConfettiAnimation } from '@/components/confetti-animation'

import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-purple-50 via-pink-50 to-orange-50">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        <Header />

        <Card className="w-full max-w-4xl border-none bg-white/80 backdrop-blur-sm shadow-md">
          <CardContent className="p-6">
            <Features />
          </CardContent>
        </Card>
      </main>

      <ConfettiAnimation enabled={true} infinite={false} />

      <Footer />
    </div>
  )
}
