import _ from 'lodash'
import Message from './model'

export function query (req, res) {
  Message
    .find({})
    .populate('from')
    .sort({'meta.createAt':-1})
    .exec(function(err, messages) {
    if(err) { return handleError(res, err); }
      return res.status(200).json(messages);
    })
};

// Get a single message
// exports.show = function(req, res) {
//   Message.findById(req.params.id, function (err, message) {
//     if(err) { return handleError(res, err); }
//     if(!message) { return res.status(404).send('Not Found'); }
//     return res.json(message);
//   });
// };

// Creates a new message in the DB.
export function create (req, res) {
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(message);
  });
};

// Updates an existing message in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Message.findById(req.params.id, function (err, message) {
//     if (err) { return handleError(res, err); }
//     if(!message) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(message, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(message);
//     });
//   });
// };

// Deletes a message from the DB.
export function destroy (req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(200).json({
        status: 'success'
      });
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
