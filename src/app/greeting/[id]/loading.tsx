'use client'

import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function LoadingGreeting() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50">
      <Card className="w-full max-w-sm shadow-md">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-10">
          <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
          <p className="text-lg text-gray-600 font-medium">
            Carregando felicitação...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
