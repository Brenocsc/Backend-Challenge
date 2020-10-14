import { fileRepository } from '../../repository'
import { translateService } from '../../../../core/services/translate'
import { serializeError } from '../../../../core/services/serialize-error'

const getUser = async (userId) => {
  try {
    return fileRepository.getUser(userId)
  } catch (error) {
    return Promise.reject({
      customMessage: translateService.translate('FILE.REGISTER_FILE.ERROR.GET_USER')
    })
  }
}

const checkData = async (body) => {
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

const buildContent = (user, body) => {
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

const buildAndWriteFile = async (user, body) => {
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

const registerFile = async (req, res) => {
  try {
    const { userId, body } = req
    const user = await getUser(userId)

    await checkData(body)
    await buildAndWriteFile(user, body)
  } catch (error) {
    return Promise.reject(
      serializeError(error, translateService.translate('FILE.REGISTER_FILE.ERROR.DEFAULT'))
    )
  }
}

export { registerFile }
