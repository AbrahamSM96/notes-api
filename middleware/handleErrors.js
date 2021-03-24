const ERROR_HANDLERS = {
  CastError: (response, error) =>
    response.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (response, { message }) =>
    response.status(409).send({
      error: message
    }),

  JsonWebTokenError: (response, error) =>
    response.status(400).json({
      error: 'required "content" field is missing'
    }),
  TokenExpirerError: (res) => res.status(401).json({ error: 'Token expired' }),

  defaultError: (response, error) => {
    console.error(error.name)
    response.status(500).end()
  }
}

module.exports = (error, request, response, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response.error)
}
