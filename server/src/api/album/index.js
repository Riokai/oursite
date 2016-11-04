import express from 'express'
import { query, create } from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.get('/', query)
router.post('/', create)

export default router
