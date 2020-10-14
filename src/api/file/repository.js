import { memoryUser } from '../../core/database/memory-users'
import fs from 'fs'

const getUser = (userId) => {
  return memoryUser.find(item => item.id === userId)
}

const writeFile = (fileName, content) => (
  fs.writeFile(fileName, content, error => error)
)

const fileRepository = {
  getUser,
  writeFile
}

export { fileRepository }
