import { readdir, unlink } from 'fs/promises'
import { join } from 'path'

const uploadDir = join(process.cwd(), 'public', 'uploads')

const cleanup = async () => {
  try {
    const files = await readdir(uploadDir)

    for (const file of files) {
      const filepath = join(uploadDir, file)
      await unlink(filepath)
    }
    console.log(
      `[${new Date().toISOString()}] Limpados ${
        files.length
      } arquivos em ${uploadDir}`
    )
  } catch (err) {
    console.error('Erro ao limpar uploads:', err)
  }
}

cleanup()
