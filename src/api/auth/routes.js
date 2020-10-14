import { Router } from 'express'
import { authController } from './controller'

const authRouter = new Router()

authRouter.post('/login', authController.processAuthLogin)

export { authRouter }
