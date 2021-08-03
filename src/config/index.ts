import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

const config = {
  i18nConfig: {
    locales: ['en'],
    directory: path.join(__dirname, '../api/assets/i18n'),
    defaultLocale: 'en',
    objectNotation: true
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET
}

export { config }
