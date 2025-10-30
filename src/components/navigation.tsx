import Link from 'next/link'

export const Navigation = () => (
  <nav className="bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-2xl">🎊</div>
        <h1 className="text-xl font-bold text-purple-600">
          SarahDay - Mensagens Especiais
        </h1>
      </div>
      <Link
        href="/create"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Criar Mensagem
      </Link>
    </div>
  </nav>
)
