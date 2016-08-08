import express from 'express'
import { isAuthenticated } from '../../auth/service'
import { query } from './controller'

const router = express.Router()

router.get('/token', isAuthenticated(), query)

export default router
