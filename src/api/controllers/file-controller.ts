import { Request, Response } from 'express'
import { registerFile } from '../services/register-file'

const processRegisterFile = (req: Request, res: Response) => {
  registerFile(req)
    .then(resp => res.status(200).send(resp))
    .catch(error => res.status(error.status).send({ message: error.error.message }))
}

const fileController = {
  processRegisterFile
}

export { fileController }
