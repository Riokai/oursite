import express from 'express'
import { query, create, destroy, appendChild } from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.get('/', isAuthenticated(), query)
// router.get('/:id', show)
router.post('/', isAuthenticated(), create)
router.post('/:id', isAuthenticated(), appendChild)
// router.put('/:id', update)
// router.patch('/:id', update)
router.delete('/:id', isAuthenticated(), destroy)

export default router
