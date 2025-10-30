import Link from 'next/link'

export const Header = () => (
  <div className="text-center max-w-2xl mx-auto">
    <h1 className="text-5xl font-bold text-gray-800 mb-6">
      Crie Mensagens Inesquecíveis
    </h1>
    <p className="text-xl text-gray-600 mb-8">
      Surpreenda quem você ama com mensagens personalizadas, fotos e muito
      carinho. Compartilhe pelo WhatsApp em segundos!
    </p>
    <Link
      href="/create"
      className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
    >
      Criar Mensagem Agora →
    </Link>
  </div>
)
