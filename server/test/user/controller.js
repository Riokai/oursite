import User from '../../src/api/user/model'
import Msg from '../../src/config/message'

describe('API: User', () => {
  before((done) => {
    User.remove().exec().then(() => {
      done()
    })
  })

  afterEach((done) => {
    User.remove().exec().then(() => {
      done()
    })
  })

  it('不发送token', done => {
    request(app)
      .get('/api/user/me')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.not.ok
        expect(res.body).to.be.an('object')
        expect(res.body.code).to.equal(Msg.noToken.code)
        done()
      })
  })

  it('发送一个格式有误的token', done => {
    request(app)
      .get('/api/user/me')
      .set('Authorization', 'i am a doubi token')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.not.ok
        expect(res.body).to.be.an('object')
        expect(res.body.code).to.equal(Msg.errorTokenFormat.code)
        done()
      })
  })

  it('登录一个错误的用户名或者密码', done => {
    // request(app)
    //   .get('/api/user/me')
  })
})
