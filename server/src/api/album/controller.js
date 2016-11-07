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
  }, (err, album) => {
    if (err) {
      console.log('err', err)
      return
    }

    return res.status(200).json({
      ...Msg.success,
      data: album
    })
  })
}

export function addImage(req, res) {
  const albumId = req.params.id
  const { hash, intro } = req.body

  console.log('albumId', albumId);

  Album
    .findById(albumId)
    .exec()
    .then(album => {
      album.children.push({
        hash, intro
      })

      return album.save()
    })
    .then(album => {
      res.status(200).json({
        ...Msg.success,
        data: album
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}
