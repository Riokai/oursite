'use strict'

import mongoose from 'mongoose'
import crypto from 'crypto'
import { signToken } from '../../auth/service'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  nickname: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  // provider: String,
  salt: String
})

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    }
  })

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return signToken(this._id)
  })

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length
  }, 'Email cannot be blank')

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length
  }, 'Password cannot be blank')

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err
      if(user) {
        if(self.id === user.id) return respond(true)
        return respond(false)
      }
      respond(true)
    })
}, 'The specified email address is already in use.')

var validatePresenceOf = function(value) {
  return value && value.length
}

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // 如果用户已经存在，则抛出一个错误
    if (!this.isNew) return next(new Error('Already existed user'))

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'))
    else
      next()
  })

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - 检查密码是否一致
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return ''
    var salt = new Buffer(this.salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64')
  }
}

export default mongoose.model('User', UserSchema)
