import i18n from 'i18n'
import { Request } from 'express'
import { registerFile } from '../src/api/services/register-file'
import { fileRepository } from '../src/api/repositories/file-repository'
import { userRepository } from '../src/api/repositories/user-repository'
import { translateService } from '../src/api/services/translate'
import { config } from '../src/config'

i18n.configure(config.i18nConfig)

const requestBody = {
  body: {
    name: 'test name',
    birth: '01/01/1999',
    cpf: '131.311.131.31',
    rg: '131-313-23',
    userId: '036a2903'
  },
}

const expectAssertValue = 1

beforeEach(async () => {
  fileRepository.writeFile = jest.fn(() => (null))

  userRepository.getUserById = jest.fn(id => ({
    id,
    login: 'logintest',
    password: 'test123'
  }))
})

describe('AuthLogin', () => {
  test('registerFile should call every repository request when request is ok', async () => {
    const toBeValue = 1

    await registerFile(requestBody as Request)

    expect(fileRepository.writeFile.call.length).toBe(toBeValue)
    expect(userRepository.getUserById.call.length).toBe(toBeValue)
  })

  test('registerFile should not return error when request is ok', async () => {
    const expectAssertValueZero = 0

    expect.assertions(expectAssertValueZero)

    await registerFile(requestBody as Request).catch(err =>
      expect(err).toEqual(err)
    )
  })

  test('registerFile should return error when getUser get a error', async () => {
    userRepository.getUserById = jest.fn(() => {
      throw new TypeError()
    })

    expect.assertions(expectAssertValue)

    await registerFile(requestBody as Request).catch(err =>
      expect(err.error.message).toEqual(translateService.translate('FILE.REGISTER_FILE.ERROR.GET_USER'))
    )
  })

  test('registerFile should return error when writeFile get a error', async () => {
    fileRepository.writeFile = jest.fn(() => {
      throw new TypeError()
    })

    expect.assertions(expectAssertValue)

    await registerFile(requestBody as Request).catch(err =>
      expect(err.error.message).toEqual(translateService.translate('FILE.REGISTER_FILE.ERROR.BUILD_WRITE_DATA'))
    )
  })

  // test('registerFile should return error when getUser returns no user', async () => {
  //   authRepository.getUser = jest.fn(() => null)

  //   expect.assertions(expectAssertValue)

  //   await authLogin(requestBody).catch(err =>
  //     expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.NOT_FOUND_USER'))
  //   )
  // })

  test('registerFile should return error when missing some value', async () => {
    const requestBodyWrong = {
      body: {
        name: 'test name',
        birth: '01/01/1999',
        cpf: '131.311.131.31',
        userId: '036a2903'
      },
    }

    expect.assertions(expectAssertValue)

    await registerFile(requestBodyWrong as Request).catch(err =>
      expect(err.error.message).toEqual(translateService.translate('FILE.REGISTER_FILE.ERROR.MISSING_DATA'))
    )
  })
})