'use client'

import { Card, CardContent } from '@/components/ui/card'

type Props = {
  name: string
  message: string
  sender?: string
}

export const GreetingContent = ({ name, message, sender }: Props) => {
  const dateString = new Date().toLocaleDateString('pt-BR')

  return (
    <div className="relative z-10 animate-fade-in">
      <Card className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl shadow-2xl p-1">
        <CardContent className="bg-white rounded-3xl p-10 max-w-3xl w-full">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
            <h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
              style={{
                fontFamily: 'var(--font-just-me-again-down-here), cursive',
              }}
            >
              Feliz Aniversário
            </h1>
            <p className="text-2xl text-gray-700 font-medium">{name}</p>
          </div>

          {/* Mensagem */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 shadow-inner">
            <blockquote className="text-center text-gray-800 text-lg md:text-xl italic font-semibold leading-relaxed overflow-y-auto max-h-64">
              {message}
            </blockquote>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm animate-slide-up">
            Criado com ❤️ por {sender ?? 'alguém'} em {dateString}
            <div className="mt-2 text-xs text-gray-400">
              <a
                href="/create"
                className="underline hover:text-purple-500 transition"
              >
                Vamos criar uma mensagem?
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
