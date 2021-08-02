import express from 'express'
import i18n from 'i18n'
import bodyParser from 'body-parser'
import { routers } from './api'
import { config } from './config'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

i18n.configure(config.i18nConfig)

app.use(routers)

app.listen(3000)
