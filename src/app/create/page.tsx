import { FormCreateGreeting } from '@/components/form-create-greeting'
import Link from 'next/link'

export default function CreateGreetingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-pink-50 py-16 px-4 relative">
      {/* Botão flutuante voltar para home */}
      <Link
        href="/"
        className="fixed top-6 right-6 bg-white text-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
        title="Voltar para Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Mensagem</h1>

      <FormCreateGreeting />
    </main>
  )
}
