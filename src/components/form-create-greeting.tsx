'use client'

import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Loader2 } from 'lucide-react'

export type GreetingFormData = {
  name: string
  whatsapp: string
  message: string
  sender?: string
}

export const FormCreateGreeting = () => {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [message, setMessage] = useState('')
  const [sender, setSender] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, message, sender }),
      })
      const data = await res.json()

      if (data.id) window.location.href = `/greeting/${data.id}`
    } catch (err) {
      console.error(err)
      setLoading(false)
      alert('Erro ao salvar felicitação. Tente novamente.')
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6 md:p-8 w-full bg-purple-50/70 backdrop-blur-sm border border-purple-200 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Label className="mb-2 text-purple-700">
              Para quem é esta mensagem?
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do aniversariante"
              maxLength={40}
              required
              className="focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div>
            <Label className="mb-2 text-purple-700">Seu Nome (opcional)</Label>
            <Input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Quem está enviando?"
              maxLength={40}
              className="focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div>
            <Label className="mb-2 text-purple-700">
              WhatsApp do Destinatário
            </Label>
            <Input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="(99) 99999-9999"
              required
              maxLength={20}
              pattern="^\(?\d{2}\)? ?9?\d{4}-?\d{4}$"
              className="focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div>
            <Label className="mb-2 text-purple-700">Mensagem</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva sua mensagem de aniversário aqui..."
              maxLength={280}
              rows={4}
              required
              className="focus:ring-purple-400 focus:border-purple-400 bg-white/80"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? 'Salvando...' : 'Criar mensagem'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
