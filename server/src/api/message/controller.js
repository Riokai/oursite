import _ from 'lodash'
import Message from './model'
import UserModel from '../user/model'
import Msg from '../../config/message'

export function query (req, res) {
  Message
    .find({})
    .populate('from')
    .sort({'meta.createAt':-1})
    .exec(function(err, messages) {
    if(err) { return handleError(res, err) }
      return res.status(200).json({
        ...Msg.success,
        data: messages
      })
    })
}

// Get a single message
// exports.show = function(req, res) {
//   Message.findById(req.params.id, function (err, message) {
//     if(err) { return handleError(res, err) }
//     if(!message) { return res.status(404).send('Not Found') }
//     return res.json(message)
//   })
// }

// Creates a new message in the DB.
export function create (req, res) {
  Message.create({
    ...req.body,
    from: req.user._id
  }, function(err, message) {
    if(err) { return handleError(res, err) }
    return res.status(200).json({
      ...Msg.success,
      data: message
    })
  })
}

// 添加一条子记录
export function appendChild (req, res) {
  const parentId = req.params.id
  const childMessage = req.body

  Message
    .findById(parentId)
    .exec()
    .then(message => {
      if (!message.children)  message.children = []

      message.children.push({
        ...childMessage
      })

      return message.save()
    })
    .then(message => res.status(200).json({
      ...Msg.success,
      data: message
    }))
    .catch(err => {
      console.log('err', err)
    })
}

// Updates an existing message in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id }
//   Message.findById(req.params.id, function (err, message) {
//     if (err) { return handleError(res, err) }
//     if(!message) { return res.status(404).send('Not Found') }
//     var updated = _.merge(message, req.body)
//     updated.save(function (err) {
//       if (err) { return handleError(res, err) }
//       return res.status(200).json(message)
//     })
//   })
// }

// Deletes a message from the DB.
export function destroy (req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err) }
    if(!message) { return res.status(200).json(Msg.noRecord) }
    message.remove(function(err) {
      if(err) { return handleError(res, err) }
      return res.status(200).json(Msg.success)
    })
  })
}

function handleError(res, err) {
  let message = {}
  let arrContent = []

  if (err.name === 'ValidationError') {
    for (let error in err.errors) {
      if (err.errors[error].kind === 'required') {
        message.code = Msg.noContent.code
        arrContent.push(err.errors[error].path)
      }
    }

    message.msg = `${arrContent.join(',')}${Msg.noContent.msg}`
    return res.status(200).send(message)
  } else {
    return res.status(500).send(err)
  }

}
