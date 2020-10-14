const BAD_REQUEST_STATUS = 400

const getError = (message) => ({
  status: BAD_REQUEST_STATUS,
  error: {
    message
  }
})

const serializeError = (error, defaultError) => {
  return error && error.customMessage ?
    getError(error.customMessage) :
    getError(defaultError)
}

export { serializeError }
