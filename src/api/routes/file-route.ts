import { Router } from 'express'
import { fileController } from '../controllers/file-controller'
import { middleware } from '../services/middleware'

const fileRouter = Router()

fileRouter.use(middleware.auth)
fileRouter.post('/register', fileController.processRegisterFile)

export { fileRouter }
