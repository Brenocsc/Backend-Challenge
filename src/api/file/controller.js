import { registerFile } from './use-cases'

const processRegisterFile = (req, res) => {
  registerFile(req, res)
    .then(resp => res.status(200).send(resp))
    .catch(error => res.status(error.status).send({ message: error.error.message }))
}

const fileController = {
  processRegisterFile
}

export { fileController }
