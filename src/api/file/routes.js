import { Router } from 'express'
import { fileController } from './controller'
import { middleware } from '../../core/services/middleware'

const fileRouter = new Router()

fileRouter.use(middleware.auth)
fileRouter.post('/register', fileController.processRegisterFile)

export { fileRouter }
