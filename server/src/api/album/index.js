import express from 'express'
import { query, create, addImage } from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.get('/', query)
router.post('/', create)
router.post('/:id', addImage)

export default router
