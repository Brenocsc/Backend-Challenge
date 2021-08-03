import jwt from 'jsonwebtoken'
import { User } from '../interfaces/user-interface'
import { config } from '../../config'

const generateToken = (user: User) => (
  jwt.sign({ id: user.id }, config.jwtSecret as string, { expiresIn: 3600 })
)

const validateToken = (token: string, method: any) => (
  jwt.verify(token, config.jwtSecret as string, method)
)

const jwtService = {
  generateToken,
  validateToken
}

export { jwtService }
