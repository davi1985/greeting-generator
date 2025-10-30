'use client'

type Props = {
  name: string
  message: string
  sender?: string
}

export const GreetingContent = ({ name, message, sender }: Props) => {
  return (
    <>
      <div className="relative z-10">
        <div className="bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 p-1 rounded-3xl shadow-2xl animate-fade-in">
          <div className="bg-white rounded-3xl p-10 max-w-3xl w-full">
            <div className="text-center mb-8 animate-slide-up">
              <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
              <h1
                className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                style={{
                  fontFamily: 'var(--font-just-me-again-down-here), cursive',
                }}
              >
                Feliz Aniversário
              </h1>
              <p className="text-2xl text-gray-700 font-medium"> {name}</p>
            </div>

            <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 shadow-inner">
              <div className="text-sm md:text-xl text-gray-800 text-center leading-relaxed max-h-64 overflow-y-auto">
                <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                  <p
                    className="text-sm md:text-xl text-gray-600 text-center leading-relaxed"
                    style={{ fontFamily: 'var(--font-indie), cursive' }}
                  >
                    {message}
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm animate-slide-up">
              Criado com ❤️ por {sender ?? 'alguém'} em{' '}
              {new Date().toLocaleDateString('pt-BR')}
              <div className="mt-2 text-xs text-gray-400">
                <a
                  href="/create"
                  className="underline hover:text-purple-500 transition"
                >
                  Deseja criar uma message para alguém?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
