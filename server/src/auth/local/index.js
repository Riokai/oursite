import express from 'express'
import passport from 'passport'
import * as auth from  '../service'
import Msg from '../../config/message'

const router = express.Router()

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info
    if (error) return res.status(401).json(error)
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'})

    const token = auth.signToken(user._id, user.role)

    res.json({
      ...Msg.success,
      data: {
        token
      }
    })
  })(req, res, next)
})

export default router
