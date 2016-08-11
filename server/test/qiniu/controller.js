import Msg from '../../src/config/message'
import { signin } from '../utils'
import User from '../../src/api/user/model'

describe('API: Qiniu', () => {
  beforeEach((done) => {
    User.remove().exec().then(function() {
      done()
    })
  })

  it('未登录应该返回错误', done => {
    request(app)
      .get('/api/qiniu/token')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.not.ok
        expect(res.body.code).to.equal(Msg.noToken.code)

        done()
      })
  })

  it('登录后应该返回正确token', done => {
    signin(token => {
      request(app)
        .get('/api/qiniu/token')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.not.ok
          expect(res.body.code).to.equal(Msg.success.code)
          expect(res.body.data.token).to.be.a('string')

          done()
        })
    })
  })
});
