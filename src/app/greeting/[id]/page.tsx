import { Suspense } from 'react'
import { GreetingContent } from '@/components/greeting-content'
import { ConfettiAnimation } from '@/components/confetti-animation'

export default async function GreetingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/greeting?id=${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-pink-50 py-16 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col gap-4 items-center">
          <span className="text-6xl mb-2">💌</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Ops! Mensagem não encontrada
          </h1>
          <p className="text-gray-600 text-center">
            Verifique se o link está correto ou tente novamente mais tarde.
          </p>
          <a
            href="/create"
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Vamos criar uma nova mensagem?
          </a>
        </div>
      </main>
    )
  }

  const data = await res.json()
  const { name, message, sender } = data
  const shareUrl = `${baseUrl}/hello?id=${id}`
  const whatsappShareMessage = `Olá ${name}, hoje é o seu dia, veja esta linda mensagem criada para você:\nAcessar: ${shareUrl}`
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    whatsappShareMessage
  )}`

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-100 via-pink-50 to-orange-100 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-float"></div>
      </div>

      <ConfettiAnimation enabled infinite={false} />

      <Suspense
        fallback={
          <div className="bg-white rounded-3xl p-10 max-w-3xl w-full animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
        }
      >
        <GreetingContent name={name} message={message} sender={sender} />
      </Suspense>

      <a
        href={whatsappShare}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-linear-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
        title="Compartilhar no WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </main>
  )
}
