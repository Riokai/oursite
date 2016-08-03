import User from '../../src/api/user/model'
import Msg from '../../src/config/message'
import { user, signin } from '../utils'


describe('API: User', () => {
  beforeEach((done) => {
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

  it('注册一个用户', done => {
    request(app)
      .post('/api/user')
      .send(user)
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.not.ok
        expect(res.body.data.token).to.be.a('string')

        done()
      })
  })

  it('重复注册应该返回失败', done => {
    signin(token => {
      request(app)
        .post('/api/user')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.not.ok
          expect(res.body.code).to.equal(Msg.existUser.code)
          done()
        })
    })
  })

  it('登录一个已经注册的账号', done => {
    signin(token => {
      request(app)
        .post('/auth/local')
        .send({
          email: user.email,
          password: user.password
        })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.not.ok
          expect(res.body).to.be.a('object')
          expect(res.body.data.token).to.be.a('string')
          done()
        })
    })
  })
})
