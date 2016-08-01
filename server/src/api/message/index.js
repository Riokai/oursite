import express from 'express'
import { query, create, destroy } from './controller'

const router = express.Router()

router.get('/', query)
// router.get('/:id', show)
router.post('/', create)
// router.put('/:id', update)
// router.patch('/:id', update)
router.delete('/:id', destroy)

export default router
