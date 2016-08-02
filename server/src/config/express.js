import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import errorHandler from 'errorHandler'
import path from 'path'
import compression from 'compression'
import passport from 'passport'

const env = process.env.NODE_ENV

export default function (app) {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(compression())
  app.use(methodOverride())
  app.use(passport.initialize())
  app.use(errorHandler())

  if (env === 'development') {
    app.use(morgan('dev'))
  }
}
