import { memoryUser } from '../../core/database/memory-users'

const getUser = (userlogin) => (
  memoryUser.find(item => item.login === userlogin)
)

const authRepository = {
  getUser
}

export { authRepository }
