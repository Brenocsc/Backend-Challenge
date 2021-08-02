import { Request, Response } from 'express'
import { fileRepository } from '../repositories/file-repository'
import { userRepository } from '../repositories/user-repository'
import { translateService } from './translate'
import { serializeError } from './serialize-error'
import { User } from '../interfaces/user-interface'
import { RegisterFileBody } from '../interfaces/register-file-body-interface'

const getUser = async (userId: string) => {
  try {
    const user = userRepository.getUserById(userId)
    if (!user) {
      return Promise.reject({
        customMessage: translateService.translate('AUTH.AUTH_LOGIN.ERROR.NOT_FOUND_USER')
      })
    }
    return user
  } catch (error) {
    return Promise.reject({
      customMessage: translateService.translate('FILE.REGISTER_FILE.ERROR.GET_USER')
    })
  }
}

const checkData = async (body: RegisterFileBody) => {
  const hasAll = 'name' in body &&
    'birth' in body &&
    'cpf' in body &&
    'rg' in body

  if (!hasAll) {
    return Promise.reject({
      customMessage: translateService.translate('FILE.REGISTER_FILE.ERROR.MISSING_DATA')
    })
  }
}

const buildContent = (user: User, body: RegisterFileBody) => {
  const { name, birth, cpf, rg } = body
  const { login, password } = user

  const content = `  Nome Completo: ${name}
  Data de Nascimento: ${birth}
  CPF: ${cpf}
  RG: ${rg}

  Usuario Autenticado
  Login: ${login}
  IP: ${password}`

  return content
}

const buildAndWriteFile = async (user: User, body: RegisterFileBody) => {
  try {
    const content = buildContent(user, body)
    const nameFile = `${body.name}.txt`

    fileRepository.writeFile(nameFile, content)
    return content
  } catch (error) {
    return Promise.reject({
      customMessage: translateService.translate('FILE.REGISTER_FILE.ERROR.BUILD_WRITE_DATA')
    })
  }
}

const registerFile = async (req: Request, _: Response) => {
  try {
    const { body } = req
    const user = await getUser(body.userId)

    await checkData(body)
    await buildAndWriteFile(user, body)
  } catch (error) {
    return Promise.reject(
      serializeError(error, translateService.translate('FILE.REGISTER_FILE.ERROR.DEFAULT'))
    )
  }
}

export { registerFile }
