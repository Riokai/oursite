var moment = require('moment');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var MessageSchema = new Schema({
  from: {
  	type: ObjectId,
  	ref: 'User'
  },
  content: String,
  createTime: {
  	type: String,
  	default: null
  },
  children: [{
  	from: {
  		type: ObjectId,
  		ref: 'user'
  	},
  	to: {
  		type: ObjectId,
  		ref: 'user'
  	},
  	content: String,
  	createTime: {
  		type: String,
  		default: moment().format('YYYY-MM-DD HH:mm:ss')
  	}
  }],
  meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

// Validate empty content
MessageSchema
  .path('content')
  .validate(function(content) {
    return content.length;
  }, 'Content cannot be blank');

// Validate empty from ObjectId
MessageSchema
  .path('from')
  .validate(function(from) {
    return from.length;
  }, 'From ObjectId cannot be blank');

MessageSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.updateAt = Date.now();
		this.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
	} else {
		this.updateAt = Date.now();
	}

	next();
});

module.exports = mongoose.model('Message', MessageSchema);
