import i18n from 'i18n'

const translate = (token: string) => {
  const { __ } = i18n
  return __(token)
}

const translateService = {
  translate
}

export { translateService }
