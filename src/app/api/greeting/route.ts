import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const { name, whatsapp, message, sender } = json

    console.log('Dados recebidos:', { name, whatsapp, message, sender })

    if (!name || !whatsapp || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes: name, whatsapp, message' },
        { status: 400 }
      )
    }

    const docRef = await addDoc(collection(db, 'greetings'), {
      name,
      whatsapp,
      message,
      sender,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: docRef.id })
  } catch (err) {
    console.error('Erro ao salvar felicitação:', err)
    return NextResponse.json(
      { error: 'Erro ao salvar felicitação' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  try {
    const docRef = doc(db, 'greetings', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
