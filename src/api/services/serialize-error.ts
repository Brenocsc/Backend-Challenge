const BAD_REQUEST_STATUS = 400

const getError = (message: string) => ({
  status: BAD_REQUEST_STATUS,
  error: {
    message
  }
})

const serializeError = (error: any, defaultError: string) => {
  return error && error.customMessage
    ? getError(error.customMessage)
    : getError(defaultError)
}

export { serializeError }
