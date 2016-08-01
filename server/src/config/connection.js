import mongoose from 'mongoose'
import _debug from 'debug'

import config from './environment'

const debug = _debug('app:database')

mongoose.Promise = global.Promise

export default function () {
  mongoose.connect(config.mongo.uri)

  // let connection
  //
  // if(!module.parent) {
  //  connection = mongoose.connection
  // }

  const connection = mongoose.connection

  console.log('create cnnection')


  connection.on('connected', () => {
    debug(`connected to ${config.mongo.uri}`)
  })

  connection.on('error', error => {
    debug(`connection error ${error}`)
  })

  connection.on('disconnected', () => {
    debug('connection is disconnected')
  })

  process.on('SIGINT', function() {
    connection.close(() => {
      debug('connection disconnected through app termination')
      process.exit(0)
    })
  })
}
