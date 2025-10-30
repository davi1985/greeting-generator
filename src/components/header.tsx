'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const Header = () => (
  <div className="text-center max-w-xl mx-auto px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
      Crie Mensagens Inesquecíveis
    </h1>
    <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
      Surpreenda quem você ama com mensagens personalizadas, fotos e muito
      carinho. Compartilhe pelo WhatsApp em segundos!
    </p>
    <Link href="/create" passHref>
      <Button
        asChild
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold shadow-lg"
      >
        <span>
          Criar Mensagem Agora
          <ArrowRight className="w-5 h-5" />
        </span>
      </Button>
    </Link>
  </div>
)
