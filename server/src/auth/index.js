import express from 'express'
import passport from 'passport'
import config from '../config/environment'
import User from '../api/user/model'
import { setup } from './local/passport'
import local from './local'

// Passport Configuration
setup(User, config)

const router = express.Router()

router.use('/local', local)

export default router
