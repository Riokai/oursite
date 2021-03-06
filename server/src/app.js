import express from 'express'
import mongoose from 'mongoose'
import _debug from 'debug'

import setRoutes from './routes'
import connection from './config/connection'
import setConfig from './config/express'

import msg from './config/message'

const debug = _debug('app:server')
const PORT = process.env.PORT || 5000
const app = express()

setConfig(app)
setRoutes(app)
connection()

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(200).json(msg.errorTokenFormat)
  }
})

app.listen(PORT, () => {
  debug(`Server running on http://localhost:${PORT}`)
})

export default app
