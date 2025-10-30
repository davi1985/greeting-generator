import Link from 'next/link'

export default async function HelloPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-pink-300 via-pink-200 to-pink-100 px-4">
      <div className="text-center">
        <h1
          className="text-6xl md:text-7xl font-bold mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          style={{ fontFamily: 'var(--font-just-me-again-down-here), cursive' }}
        >
          Happy Birthday!
        </h1>

        <Link
          href={id ? `/greeting/${id}` : '/create'}
          className="inline-block bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Ver Mensagem
        </Link>
      </div>
    </main>
  )
}
