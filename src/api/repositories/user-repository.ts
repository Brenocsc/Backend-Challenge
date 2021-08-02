import { memoryUser } from '../database/memory-users'

const getUserByLogin = (userlogin: string) => (
  memoryUser.find(item => item.login === userlogin)
)

const getUserById = (userId: string) => (
  memoryUser.find(item => item.id === userId)
)

const userRepository = {
  getUserByLogin,
  getUserById
}

export { userRepository }
