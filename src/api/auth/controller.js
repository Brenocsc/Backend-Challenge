import { authLogin } from './use-cases'

const processAuthLogin = (req, res) => {
  authLogin(req, res)
    .then(resp => res.status(200).send(resp))
    .catch(error => res.status(error.status).send({ message: error.error.message }))
}

const authController = {
  processAuthLogin
}

export { authController }
