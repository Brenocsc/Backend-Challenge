import i18n from 'i18n'
import { authLogin } from './auth-login'
import { authRepository } from '../../repository'
import { translateService } from '../../../../core/services/translate'
import { jwtService } from '../../../../core/services/jwt'
import { config } from '../../../../core/config'

i18n.configure(config.i18nConfig)

const requestBody = {
  body: {
    login: 'logintest',
    password: 'test123'
  }
}

const expectAssertValue = 1

beforeEach(async () => {
  authRepository.getUser = jest.fn(login => ({
    id: '036a2903',
    login,
    password: 'test123'
  }))

  jwtService.generateToken = jest.fn(user => (`${user.id}123`))
})

test('authLogin should call every repository request when request is ok', async () => {
  const toBeValue = 1

  await authLogin(requestBody)

  expect(authRepository.getUser.mock.calls.length).toBe(toBeValue)
  expect(jwtService.generateToken.mock.calls.length).toBe(toBeValue)
})

test('authLogin should return token when request is ok', async () => {
  const tokenExpected =  '036a2903123'
  const token = await authLogin(requestBody)

  expect(token).toEqual(tokenExpected)
})

test('authLogin should return error when getUser get a error', async () => {
  authRepository.getUser = jest.fn(() => {
    throw new TypeError()
  })

  expect.assertions(expectAssertValue)

  await authLogin(requestBody).catch(err =>
    expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.GET_USER'))
  )
})

test('authLogin should return error when generateToken get a error', async () => {
  jwtService.generateToken = jest.fn(() => {
    throw new TypeError()
  })

  expect.assertions(expectAssertValue)

  await authLogin(requestBody).catch(err =>
    expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.DEFAULT'))
  )
})

test('authLogin should return error when getUser returns no user', async () => {
  authRepository.getUser = jest.fn(() => null)

  expect.assertions(expectAssertValue)

  await authLogin(requestBody).catch(err =>
    expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.NOT_FOUND_USER'))
  )
})

test('authLogin should return error when the password is wrong', async () => {
  const requestBodyWrong = {
    body: {
      login: 'logintest',
      password: 'testwrong'
    }
  }

  expect.assertions(expectAssertValue)

  await authLogin(requestBodyWrong).catch(err =>
    expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.INVALID_PASSWORD'))
  )
})
