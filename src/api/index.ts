import { Router } from 'express'
import { authRouter } from './routes/auth-route'
import { fileRouter } from './routes/file-route'

const routers = Router()

routers.use('/auth', authRouter)
routers.use('/file', fileRouter)

export { routers }
