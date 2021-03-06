import mongoose from 'mongoose'
import passport from 'passport'
import config from '../config/environment'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import compose from 'composable-middleware'
import User from '../api/user/model'
import msg from '../config/message'

const validateJwt = expressJwt({ secret: config.secrets.session })

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`
      }

      if (!req.headers.authorization) {
        return res.json(msg.noToken)
      }

      validateJwt(req, res, next)
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, (err, user) => {
        if (err) return next(err)
        if (!user) return res.status(200).json(msg.loginError)

        req.user = user
        next()
      })
    })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set')

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next()
      }
      else {
        res.status(403).send('Forbidden')
      }
    })
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id) {
  const token = jwt.sign({ _id: id }, config.secrets.session, { expiresIn: '2 days' })

  return token
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'})
  var token = signToken(req.user._id, req.user.role)
  res.cookie('token', JSON.stringify(token))
  res.redirect('/')
}
