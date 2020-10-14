import { Router } from 'express'
import { authRouter } from './auth/routes'
import { fileRouter } from './file/routes'

const routers = new Router()

routers.use('/auth', authRouter)
routers.use('/file', fileRouter)

export { routers }
