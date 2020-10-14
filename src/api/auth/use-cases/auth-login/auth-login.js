import { authRepository } from '../../repository'
import { translateService } from '../../../../core/services/translate'
import { serializeError } from '../../../../core/services/serialize-error'
import { jwtService } from '../../../../core/services/jwt'

const getUser = async (login) => {
  try {
    return authRepository.getUser(login)
  } catch (error) {
    return Promise.reject({
      customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.GET_USER')
    })
  }
}

const checkUser = async (user) => {
  if (!user) {
    return Promise.reject({
      customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.NOT_FOUND_USER')
    })
  }
}

const checkPassword = async (password, user) => {
  if (password !== user.password) {
    return Promise.reject({
      customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.INVALID_PASSWORD')
    })
  }
}

const authLogin = async (req, res) => {
  try {
    const { login, password } = req.body
    const user = await getUser(login)

    await checkUser(user)
    await checkPassword(password, user)

    return jwtService.generateToken(user)
  } catch (error) {
    return Promise.reject(
      serializeError(error, translateService.translate('AUTH.AUTH_LOGIN.ERROR.DEFAULT'))
    )
  }
}

export { authLogin }
