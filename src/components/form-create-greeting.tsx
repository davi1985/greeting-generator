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
  images: File[]
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
      className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto flex flex-col gap-6"
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
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Imagens (até 3)
        </label>
        <label
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-6 py-8 cursor-pointer transition-colors ${
            dragActive
              ? 'border-purple-400 bg-purple-50'
              : 'border-gray-300 bg-gray-50 hover:border-purple-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <span className="text-gray-400 text-3xl mb-2">📷</span>
          <span className="text-gray-600 mb-1">
            Arraste ou clique para selecionar até 3 imagens
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {images.length > 0 && (
          <div className="flex gap-2 mt-4">
            {images.map((img, i) => {
              const url = URL.createObjectURL(img)
              return (
                <div
                  key={i}
                  className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center group"
                >
                  <img
                    src={url}
                    alt={img.name}
                    className="object-cover w-full h-full"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-gray-600 hover:text-red-600 hover:bg-opacity-100 transition-opacity opacity-80 group-hover:opacity-100"
                    aria-label="Remover imagem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 8.586l3.536-3.535a1 1 0 111.415 1.415L11.414 10l3.535 3.536a1 1 0 01-1.415 1.415L10 11.414l-3.536 3.535a1 1 0 01-1.415-1.415L8.586 10l-3.535-3.536A1 1 0 016.465 5.05L10 8.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        )}
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
