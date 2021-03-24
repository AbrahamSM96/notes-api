const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

const userExtractor = require('../middleware/userExtractor')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      next(err)
    })
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const { content, important } = request.body
  const { userId } = request
  // obtenemos el id del request notes para buscar el user
  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content: content,
    date: new Date(),
    important: important || false,
    user: user._id
  })

  try {
    const savedNote = await newNote.save()
    // En el modelo User concatenamos el id de la nueva nota
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      response.json(result)
    })
    .catch((err) => next(err))
})

notesRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  try {
    const res = await Note.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
