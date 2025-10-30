'use client'

import { FormCreateGreeting } from '@/components/form-create-greeting'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CreateGreetingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-pink-50 py-16 px-4 relative">
      <Link href="/" passHref>
        <Button
          asChild
          variant="outline"
          size="icon"
          className="fixed top-6 left-6 rounded-full shadow-lg hover:bg-purple-600 hover:text-white text-purple-600 border-purple-400 z-50 transition-colors"
          title="Voltar para Home"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Mensagem</h1>

      <FormCreateGreeting />
    </main>
  )
}
