const jwt = require('jsonwebtoken')
module.exports = (request, response, next) => {
  // Aqui vamos a capturar el token de los headers para decodificarlo
  const authorization = request.get('authorization')
  let token = ''
  // Lo que tenga en authorization lo pasaremos a minusculas y tendremos que comprobar de que empiece con bearer
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    // El token en si empieza en la posicion 7
    token = authorization.substring(7)
  }

  // Comprobamos el token con nuestra palabra secret para descifrar el token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
