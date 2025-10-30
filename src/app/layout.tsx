import type { Metadata } from 'next'
import {
  Poppins,
  Indie_Flower,
  Rock_Salt,
  Just_Me_Again_Down_Here,
} from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const justMeAgainDownHere = Just_Me_Again_Down_Here({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-just-me-again-down-here',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SarahDay - Felicitações Especiais',
  description: 'Crie felicitações inesquecíveis para quem você ama.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={[
          poppins.variable,
          justMeAgainDownHere.variable,
          poppins.className,
          'antialiased',
        ].join(' ')}
      >
        {children}
      </body>
    </html>
  )
}
