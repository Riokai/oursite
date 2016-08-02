import mongoose, { Schema } from 'mongoose'

const ModuleSchema = new Schema({
  name: String,
  href: String,
  color: String,
  pv: {
  	type: Number,
  	default: 0
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

ModuleSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.updateAt = Date.now()
	} else {
		this.updateAt = Date.now()
	}

	next()
})

// Validate empty name
ModuleSchema
	.path('name')
	.validate(function(name) {
		return name.length
	}, 'Module name cannot be blank')

// Validate name is not taken
ModuleSchema
	.path('name')
	.validate(function(value, respond) {
		const self = this

		this.constructor.findOne({
			name: value
		}, function(err, module) {
			if (err) throw err

			if (module) {
				if (self.id === module.id) return respond(true)

				return respond(false)
			}

			respond(true)
		})
	}, 'The specified name is already in use.')

// Validate empty href
ModuleSchema
	.path('href')
	.validate(function(href) {
		return href.length
	}, 'Module href cannot be blank')

// Validate empty color
ModuleSchema
	.path('color')
	.validate(function(color) {
		return color.length
	}, 'Module color cannot be blank')

export default mongoose.model('Module', ModuleSchema)
