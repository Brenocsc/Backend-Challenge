import { Request, Response } from 'express'
import { authLogin } from '../services/auth-login'

const processAuthLogin = (req: Request, res: Response) => {
  authLogin(req, res)
    .then(resp => res.status(200).send(resp))
    .catch(error => res.status(error.status).send({ message: error.error.message }))
}

const authController = {
  processAuthLogin
}

export { authController }
