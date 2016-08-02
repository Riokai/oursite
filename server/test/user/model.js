import should from 'should'
import User from '../../src/api/user/model'

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
})

describe('Model: User', function() {
  before(function(done) {
    User.remove().exec().then(function() {
      done()
    })
  })

  afterEach(function(done) {
    User.remove().exec().then(function() {
      // app.close()

      done()
    })
  })

  it('初始时用户数为0', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0)
      done()
    })
  })

  it('保存一个相同的用户应该失败', function(done) {
    user.save(function() {
      var userDup = new User(user)

      userDup.save(function(err) {
        should.exist(err)
        done()
      })
    })
  })

  it('保存一个没有邮箱的用户应该失败', function(done) {
    user.email = ''
    user.save(function(err) {
      should.exist(err)
      done()
    })
  })

  it("如果密码错误，用户应该被成功认证", function() {
    return user.authenticate('password').should.be.true
  })

  it("如果密码错误，用户不应该被认证", function() {
    return user.authenticate('blah').should.not.be.true
  })
})
