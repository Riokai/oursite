import express from 'express'
import {
  query,
  show,
  create,
  update,
  destroy
} from './controller'

const router = express.Router()

router.get('/', query)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.patch('/:id', update)
router.delete('/:id', destroy)

export default router
