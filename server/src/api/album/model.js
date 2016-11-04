import mongoose from 'mongoose'
import moment from 'moment'

const Schema = mongoose.Schema
const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  children: [{
    url: {
      type: String
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
})

AlbumSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.updateAt = Date.now()
		this.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
	} else {
		this.updateAt = Date.now()
	}

	next()
})

export default mongoose.model('Album', AlbumSchema)
