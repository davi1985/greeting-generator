'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-react'

export const Navigation = () => (
  <nav className="bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-2xl text-purple-600">
          <Gift />
        </div>
        <h1 className="text-xl font-bold text-purple-600">
          SarahDay - Mensagens Especiais
        </h1>
      </div>

      <Link href="/create" passHref>
        <Button
          asChild
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          <span>Criar Mensagem</span>
        </Button>
      </Link>
    </div>
  </nav>
)
