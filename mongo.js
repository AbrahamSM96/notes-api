const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// conexión a mongodb

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.error(err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})

// Note.find({}).then(result =>{
//     console.log(result);
//     mongoose.connection.close()
// })

// const note = new Note({
//     content: 'MongoDB es awazome, ab',
//     date: new Date(),
//     important: true
// })

// note.save()
// .then(result => {
// console.log(result)
// mongoose.connection.close()
// }).catch(err => {
//     console.log(err)
// })
