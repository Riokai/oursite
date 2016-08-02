import should from 'should'
import Message from '../../src/api/message/model'

describe('Model: Message', function() {

	before(function(done) {
		Message.remove().exec().then(function() {
			done()
		})
	})

	afterEach(function(done) {
	  Message.remove().exec().then(function() {
	    done()
	  })
	})

	it('初始留言数为0', function(done) {

		Message.find({}, function(err, messages) {
		  messages.should.have.length(0)
		  done()
		})

  })

  it('保存一个合法留言时应该成功', function (done) {

  	var message = new Message({
  		from: '5502d4f89df9ff762d9ed733',
  		content: 'Test Content'
  	})

  	message.save(function(err, result) {
  		should.not.exist(err)
  		should.exist(result)
  		done()
  	})

  })

  it('保存一个fromId为空的留言应该失败', function (done) {

  	var message = new Message({
  		from: '',
  		content: 'Test Content'
  	})

  	message.save(function(err, result) {
  		should.exist(err)
  		done()
  	})

  })

  it('保存一个content为空的留言应该失败', function (done) {

  	var message = new Message({
  		from: '5502d4f89df9ff762d9ed733',
  		content: ''
  	})

  	// message.save(function(err, result) {
  	// 	should.exist(err)
  	// 	done()
  	// })

  	message.save().then(function(){}, function(err) {
  		should.exist(err)
  		done()
  	})

  })

  it('删除一个content应该成功', function (done) {
  	var message = new Message({
  		from: '5502d4f89df9ff762d9ed733',
  		content: 'Test Content'
  	})

  	message.save(function(err, result) {
      result.remove(function(err, result) {
        should.exist(result)
        done()
      })

  	})
  })
})
