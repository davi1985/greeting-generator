import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const jsonField = formData.get('json')
  console.log('jsonField:', jsonField)

  if (!jsonField || typeof jsonField !== 'string') {
    return NextResponse.json(
      { error: 'Campo json ausente ou inválido' },
      { status: 400 }
    )
  }
  const json = JSON.parse(jsonField)
  const { name, whatsapp, message, sender } = json
  const files = formData.getAll('images') as File[]
  const urls: string[] = []

  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}_${file.name}`
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)
    urls.push(`/uploads/${filename}`)
  }

  const docRef = await addDoc(collection(db, 'greetings'), {
    name,
    whatsapp,
    message,
    sender,
    images: urls,
    createdAt: new Date(),
  })

  return NextResponse.json({ id: docRef.id })
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
