import { Request } from 'express'
import { userRepository } from '../repositories/user-repository'
import { translateService } from './translate'
import { serializeError } from './serialize-error'
import { jwtService } from './jwt'
import { User } from '../interfaces/user-interface'

const getUser = async (login: string) => {
  try {
    const user = userRepository.getUserByLogin(login)
    if (!user) {
      return Promise.reject({
        customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.NOT_FOUND_USER')
      })
    }
    return user
  } catch (error) {
    return Promise.reject({
      customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.GET_USER')
    })
  }
}

const checkPassword = async (password: string, user: User) => {
  if (password !== user.password) {
    return Promise.reject({
      customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.INVALID_PASSWORD')
    })
  }
}

const authLogin = async (req: Request) => {
  try {
    const { login, password } = req.body
    const user = await getUser(login)

    await checkPassword(password, user)

    return jwtService.generateToken(user)
  } catch (error) {
    return Promise.reject(
      serializeError(error, translateService.translate('AUTH.AUTH_LOGIN.ERROR.DEFAULT'))
    )
  }
}

export { authLogin }
