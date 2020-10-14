import { jwtService } from './jwt'

const UNAUTHORIZED_STATUS = 401
const UNAUTHORIZED_MESSAGE = {
  error: 'User unauthorized'
}

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  

  if (!authHeader) {
    return res.status(UNAUTHORIZED_STATUS).send(UNAUTHORIZED_MESSAGE)
  }

  const [ scheme, token ] = authHeader.split(' ')
  
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(UNAUTHORIZED_STATUS).send(UNAUTHORIZED_MESSAGE)
  }

  const method = (err, decoded) => {
    if (err) {
      return res.status(UNAUTHORIZED_STATUS).send(UNAUTHORIZED_MESSAGE)
    }

    req.userId = decoded.id
    return next()
  }  

  jwtService.validateToken(token, method)
}

const middleware = {
  auth
}

export { middleware }
