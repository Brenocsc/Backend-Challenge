import jwt from 'jsonwebtoken'
import { User } from '../interfaces/user-interface'

const JWT_SECRET = '2T0Zo2TyXC9Ly9LbPknbfy'

const generateToken = (user: User) => (
  jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 })
)

const validateToken = (token: string, method: any) => (
  jwt.verify(token, JWT_SECRET, method)
)

const jwtService = {
  generateToken,
  validateToken
}

export { jwtService }
