import express from 'express'
import i18n from 'i18n'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { routers } from './api'
import { config } from './config'
import * as swaggerDocument from './swagger.json'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

i18n.configure(config.i18nConfig)

app.use(routers)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(config.port)
