const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
// Despues de definir el schema, tendremos que hacer un modelo que se puede decir que seria una clase
// Se ponen en singular ya que mongo posteriormente le agregara la S
const Note = model('Note', noteSchema)

module.exports = Note
