import jwt from 'jsonwebtoken'

const JWT_SECRET = '2T0Zo2TyXC9Ly9LbPknbfy'

const generateToken = (user) => (
  jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 })
)

const validateToken = (token, method) => (
  jwt.verify(token, JWT_SECRET, method)
)

const jwtService = {
  generateToken,
  validateToken
}

export { jwtService }
