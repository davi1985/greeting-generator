import { FeatureCard } from './feature-card'
import { MessageSquareHeart, Palette, Send } from 'lucide-react'

export function Features() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
      <FeatureCard
        icon={<MessageSquareHeart className="w-10 h-10 text-pink-500" />}
        title="Personalizado"
        description="Adicione uma mensagem única e especial para quem você ama."
      />

      <FeatureCard
        icon={<Palette className="w-10 h-10 text-purple-500" />}
        title="Layout Bonito"
        description="Designs animados, responsivos e prontos para encantar."
      />

      <FeatureCard
        icon={<Send className="w-10 h-10 text-green-500" />}
        title="Compartilhe"
        description="Envie diretamente pelo WhatsApp com um único toque."
      />
    </section>
  )
}
