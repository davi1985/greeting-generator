import { FormCreateGreeting } from '@/components/form-create-greeting'

export default function CreateGreetingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-pink-50 py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Messagem</h1>

      <FormCreateGreeting />
    </main>
  )
}
