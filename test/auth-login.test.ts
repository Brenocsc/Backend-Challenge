import i18n from 'i18n'
import { Request } from 'express'
import { authLogin } from '../src/api/services/auth-login'
import { userRepository } from '../src/api/repositories/user-repository'
import { translateService } from '../src/api/services/translate'
import { jwtService } from '../src/api/services/jwt'
import { config } from '../src/config'

i18n.configure(config.i18nConfig)

const requestBody = {
  body: {
    login: 'logintest',
    password: 'test123'
  }
}

const expectAssertValue = 1

beforeEach(async () => {
  userRepository.getUserByLogin = jest.fn(login => ({
    id: '036a2903',
    login,
    password: 'test123'
  }))

  jwtService.generateToken = jest.fn(user => (`${user.id}123`))
})

describe('AuthLogin', () => {
  test('authLogin should call every repository request when request is ok', async () => {
    const toBeValue = 1
  
    await authLogin(requestBody as Request)
  
    expect(userRepository.getUserByLogin.call.length).toBe(toBeValue)
    expect(jwtService.generateToken.call.length).toBe(toBeValue)
  })
  
  test('authLogin should return token when request is ok', async () => {
    const tokenExpected =  '036a2903123'
    const token = await authLogin(requestBody as Request)
  
    expect(token).toEqual(tokenExpected)
  })
  
  test('authLogin should return error when getUserByLogin get a error', async () => {
    userRepository.getUserByLogin = jest.fn(() => {
      throw new TypeError()
    })
  
    expect.assertions(expectAssertValue)
  
    await authLogin(requestBody as Request).catch(err =>
      expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.GET_USER'))
    )
  })
  
  test('authLogin should return error when generateToken get a error', async () => {
    jwtService.generateToken = jest.fn(() => {
      throw new TypeError()
    })
  
    expect.assertions(expectAssertValue)
  
    await authLogin(requestBody as Request).catch(err =>
      expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.DEFAULT'))
    )
  })
  
  test('authLogin should return error when getUserByLogin returns no user', async () => {
    userRepository.getUserByLogin = jest.fn(() => undefined)
  
    expect.assertions(expectAssertValue)
  
    await authLogin(requestBody as Request).catch(err =>
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
  
    await authLogin(requestBodyWrong as Request).catch(err =>
      expect(err.error.message).toEqual(translateService.translate('AUTH.AUTH_LOGIN.ERROR.INVALID_PASSWORD'))
    )
  })
})
