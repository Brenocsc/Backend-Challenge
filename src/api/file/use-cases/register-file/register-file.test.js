import i18n from 'i18n'
import { registerFile } from './register-file'
import { fileRepository } from '../../repository'
import { translateService } from '../../../../core/services/translate'
import { jwtService } from '../../../../core/services/jwt'
import { config } from '../../../../core/config'

i18n.configure(config.i18nConfig)

const requestBody = {
  body: {
    name: 'test name',
    birth: '01/01/1999',
    cpf: '131.311.131.31',
    rg: '131-313-23'
  },
  userId: '036a2903'
}

const expectAssertValue = 1

beforeEach(async () => {
  fileRepository.writeFile = jest.fn(() => (null))

  fileRepository.getUser = jest.fn(id => ({
    id,
    login: 'logintest',
    password: 'test123'
  }))
})

test('registerFile should call every repository request when request is ok', async () => {
  const toBeValue = 1

  await registerFile(requestBody)

  expect(fileRepository.writeFile.mock.calls.length).toBe(toBeValue)
  expect(fileRepository.getUser.mock.calls.length).toBe(toBeValue)
})

test('registerFile should not return error when request is ok', async () => {
  const expectAssertValueZero = 0

  expect.assertions(expectAssertValueZero)

  await registerFile(requestBody).catch(err =>
    expect(err).toEqual(err)
  )
})

test('registerFile should return error when getUser get a error', async () => {
  fileRepository.getUser = jest.fn(() => {
    throw new TypeError()
  })

  expect.assertions(expectAssertValue)

  await registerFile(requestBody).catch(err =>
    expect(err.error.message).toEqual(translateService.translate('FILE.REGISTER_FILE.ERROR.GET_USER'))
  )
})

test('registerFile should return error when writeFile get a error', async () => {
  fileRepository.writeFile = jest.fn(() => {
    throw new TypeError()
  })

  expect.assertions(expectAssertValue)

  await registerFile(requestBody).catch(err =>
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
      cpf: '131.311.131.31'
    },
    userId: '036a2903'
  }

  expect.assertions(expectAssertValue)

  await registerFile(requestBodyWrong).catch(err =>
    expect(err.error.message).toEqual(translateService.translate('FILE.REGISTER_FILE.ERROR.MISSING_DATA'))
  )
})
