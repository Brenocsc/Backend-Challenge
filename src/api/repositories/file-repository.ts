import fs from 'fs'

const writeFile = (fileName: string, content: string) => (
  fs.writeFile(fileName, content, error => error)
)

const fileRepository = {
  writeFile
}

export { fileRepository }
