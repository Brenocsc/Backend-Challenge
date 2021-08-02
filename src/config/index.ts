import path from 'path'

const config = {
  i18nConfig: {
    locales: ['en'],
    directory: path.join(__dirname, '../api/assets/i18n'), // `${__dirname}/../assets/i18n`,
    defaultLocale: 'en',
    objectNotation: true
  }
}

export { config }
