import _ from 'lodash'
import TimelineModel from './model'
import Msg from '../../config/message'

export function query (req, res) {
  TimelineModel
    .find({})
    .sort({'meta.createAt':-1})
    .exec(function(err, timelines) {
      console.log('timelines', timelines);
      if(err) { return handleError(res, err) }

      return res.status(200).json({
        ...Msg.success,
        data: timelines
      })
    })
}

// Creates a new message in the DB.
export function create (req, res) {
  TimelineModel.create({
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

// Updates an existing message in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id }
//   TimelineModel.findById(req.params.id, function (err, message) {
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
  TimelineModel.findById(req.params.id, function (err, message) {
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
