import express from 'express'
import mongoose from 'mongoose'

import config from './config/environment'
import routes from './routes'

const PORT = 4000
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(config.mongo.uri)

mongoose.connection.on('error', error => {
  console.error(`MongoDB connection error: ${error}`)
  process.exit(-1)
})

routes(app)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})

export default app
