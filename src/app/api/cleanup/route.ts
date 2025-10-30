import { NextResponse } from 'next/server'
import { readdir, unlink } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  const uploadDir = join(process.cwd(), 'public', 'uploads')

  try {
    const files = await readdir(uploadDir)

    for (const file of files) {
      await unlink(join(uploadDir, file))
    }

    return NextResponse.json({ deleted: files.length })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
