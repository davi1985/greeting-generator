# Visão geral do MVP

Objetivo:

O usuário acessa o site → cria uma felicitação → escolhe nome, mensagem e até 3 fotos → o sistema gera uma página bonita e única com um link compartilhável → ele pode enviar pelo WhatsApp.

## Stack sugerida

- Camada Tecnologia Observação
- Frontend Next.js 15 (App Router) UI + geração da página dinâmica
- Banco Supabase (ou Firebase) Armazena felicitações e fotos
- Upload de imagens Supabase Storage / UploadThing Fácil integração com Next.js
- Link único Slug UUID curto (/f/[id]) Identifica a felicitação
- Envio via WhatsApp API de link direto (https://wa.me/?text=...) Evita precisar de API paga
- Estilo/layout Tailwind + Framer Motion Layout bonito e leve
- Deploy Vercel Ideal para Next.js SaaS pequeno

## Estrutura inicial de pastas

/src
├─ app
│ ├─ page.tsx # Landing page
│ ├─ create/page.tsx # Formulário para criar felicitação
│ └─ f/[id]/page.tsx # Página pública da felicitação
├─ lib
│ ├─ supabase.ts # Cliente Supabase
│ ├─ generateLink.ts # Cria link de compartilhamento
├─ components
│ ├─ FormCreateGreeting.tsx
│ ├─ GreetingCard.tsx
│ └─ ImageUploader.tsx
├─ types
│ └─ greeting.ts

## Modelo de dados (greetings)

```ts
interface Greeting {
  id: string
  name: string
  message: string
  images: string[] // URLs das fotos
  slug: string // ex: 'feliz-aniversario-joao'
  createdAt: string
}
```

## Fluxo do usuário (MVP)

Página /create
→ Formulário: nome, mensagem, upload de até 3 fotos.
→ Ao enviar, salva no banco e gera slug/UUID.

Redireciona para /f/[slug]
→ Renderiza layout com confetes, mensagem e fotos.

Botão “Compartilhar via WhatsApp”
→ Gera link automático:
https://wa.me/?text=Veja sua surpresa! https://meusite.com/f/slug

## Layout básico da página de felicitação

Exemplo visual:

🎉 Feliz aniversário, João! 🎂
💌 "Desejo tudo de bom, muita saúde e sucesso!"
📸 [foto1] [foto2] [foto3]
✨ Compartilhado com carinho via [Seu SaaS]

Animações:

- react-confetti ou canvas-confetti
- framer-motion para transições suaves
- @react-three/fiber (versão premium) para 3D backgrounds, se quiser evoluir

## Versão futura (para monetizar)

Depois do MVP, você pode:

- Criar login via Google/Facebook → guardar felicitações dos usuários.
- Adicionar planos pagos (Stripe) → ex: planos com mais fotos, vídeos ou templates premium.
- Adicionar templates editáveis (como Canva Lite).
- Permitir custom domain (joao.felicita.me).

## Próximos passos práticos

Posso te ajudar com isso em camadas:

- Criar o esqueleto inicial do projeto Next.js com rotas /create e /f/[id].
- Adicionar upload de imagem (com Supabase ou UploadThing).
- Implementar geração e compartilhamento de link via WhatsApp.
- Adicionar layout de cartão com animação.
