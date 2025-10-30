'use client'

import { useState } from 'react'
import { storage, db } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

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
  const [images, setImages] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setImages((prev) => {
      const combined = [...prev, ...newFiles].slice(0, 3)

      return combined.filter(
        (file, idx, arr) =>
          arr.findIndex((f) => f.name === file.name && f.size === file.size) ===
          idx
      )
    })
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setImages((prev) => {
        const combined = [...prev, ...newFiles].slice(0, 3)
        return combined.filter(
          (file, idx, arr) =>
            arr.findIndex(
              (f) => f.name === file.name && f.size === file.size
            ) === idx
        )
      })
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragActive(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragActive(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append(
        'json',
        JSON.stringify({ name, whatsapp, message, sender })
      )
      images.forEach((img) => formData.append('images', img))

      const res = await fetch('/api/greeting', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setLoading(false)
      if (data.id) {
        window.location.href = `/greeting/${data.id}`
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
      alert('Erro ao salvar felicitação. Tente novamente.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto w-full flex flex-col gap-6"
      style={{ maxWidth: '600px' }}
    >
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Nome do Destinatário
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={40}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Seu Nome (opcional)
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          maxLength={40}
          placeholder="Quem está enviando?"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          WhatsApp do Destinatário
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          type="tel"
          placeholder="(99) 99999-9999"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
          pattern="^\(?\d{2}\)? ?9?\d{4}-?\d{4}$"
          maxLength={20}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Mensagem
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          maxLength={280}
        />
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {loading ? 'Salvando...' : 'Criar Felicitação'}
      </button>
    </form>
  )
}
