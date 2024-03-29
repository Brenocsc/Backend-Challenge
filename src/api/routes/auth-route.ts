import { Router } from 'express'
import { authController } from '../controllers/auth-controller'

const authRouter = Router()

authRouter.post('/login', authController.processAuthLogin)

export { authRouter }
