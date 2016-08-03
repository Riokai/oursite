import mongoose, {
  Schema
} from 'mongoose'

const { ObjectId } = Schema.Types

const TimelineSchema = new Schema({
  date: String,
  intro: String,
  media: String,
  author: {
    type: ObjectId,
    ref: 'User'
  },
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
})

TimelineSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.updateAt = Date.now()
  } else {
    this.updateAt = Date.now()
  }
  next()
})

// TimelineSchemas.pre('save')
TimelineSchema.statics = {
  fetch: function(cb) {
    return this.find({}).exec(cb)
  },
  findById: function(id, cb) {
    return this.findOne({
      _id: id
    }).exec(cb)
  }
}

export default mongoose.model('Timeline', TimelineSchema)
