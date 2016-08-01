import express from 'express'
import mongoose from 'mongoose'
import _debug from 'debug'

import routes from './routes'
import connection from './config/connection'

const debug = _debug('app:server')
const PORT = process.env.PORT || 5000
const app = express()

routes(app)

if (mongoose.connection.readyState === 0) {
  connection()

  app.listen(PORT, () => {
    debug(`Server running on http://localhost:${PORT}`)
  })
}

export default app
