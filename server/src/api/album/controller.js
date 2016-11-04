import Album from './model'
import Msg from '../../config/message'

export function query(req, res) {
  Album.find({}).exec((err, albums) => {
    return res.status(200).json({
      ...Msg.success,
      data: albums
    })
  })
}

export function create(req, res) {
  Album.create({
    name: req.body.name,
    children: []
  }, err => {
    if (err) {
      console.log('err', err)
      return
    }

    return res.status(200).json(Msg.success)
  })
}
