import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import Msg from '../../config/message'

export function setup (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, (err, user) => {
        if (err) return done(err)

        if (!user) {
          return done(null, false, Msg.noRegister)
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' })
        }

        return done(null, user)
      })
    }
  ))
}
