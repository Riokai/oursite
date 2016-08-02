import should from 'should'
import User from '../../src/api/user/model'

describe('API: Message', function() {

  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done()
    })
  })

  it('未登录请求留言列表应该返回401未授权', function(done) {
    request(app)
      .get('/api/message')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err)
        res.body.should.be.instanceof(Object)
        done()
      })
  })

  it('未登录新增一条留言应该返回401未授权', function(done) {
    request(app)
      .post('/api/message')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err)
        res.body.should.be.instanceof(Object)
        done()
      })
  })

  it('登录后应该返回留言列表', function (done) {
    var user = {
      email: 'zengkai@hotmail.com',
      nickname: 'Kai',
      password: '12345678'
    }

    request(app)
      .post('/api/user')
      .type('json')
      .send(user)
      .expect(200)
      .end((err, res) => {
        const token = res.body.token

        expect(err).to.not.be.ok
        expect(token).to.be.a('string')
        expect(token).to.have.lengthOf(172)

        request(app)
          .get('/api/message')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.body).to.be.an('array')
            done()
          })
      })
  })
})
