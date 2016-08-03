import should from 'should'
import User from '../../src/api/user/model'
import Msg from '../../src/config/message'
import {
  signin,
  createMessage,
  createTimeline
} from '../utils'

describe('API: Timeline', function() {

  beforeEach((done) => {
    // Clear users before testing
    User.remove().exec().then(function() {
      done()
    })
  })

  it('未登录请求时光轴列表应该返回错误', (done) => {
    request(app)
      .get('/api/timeline')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(err).to.be.not.ok
        expect(res.body.code).to.equal(Msg.noToken.code)
        done()
      })
  })

  it('未登录新增一条时间轴应该返回未授权', (done) => {
    request(app)
      .post('/api/timeline')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(err).to.be.not.ok
        expect(res.body.code).to.equal(Msg.noToken.code)
        done()
      })
  })

  it('登录后应该返回时间轴列表', done => {
    signin(token => {
      request(app)
        .get('/api/timeline')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.be.an('object')
          done()
        })
    })
  })

  it('添加一条新记录', done => {
    signin(token => {
      createMessage(token, () => {
        done()
      })
    })
  })

  it('删除一条不存在的记录', done => {
    signin(token => {
      request(app)
        .delete(`/api/timeline/37a1c660fb706285db108d97`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.not.ok
          expect(res.body).to.be.a('object')
          expect(res.body.code).to.equal(Msg.noRecord.code)
          done()
        })
    })
  })

  it('删除一条存在的记录', done => {
    signin(token => {
      createTimeline(token, data => {
        request(app)
          .delete(`/api/timeline/${data._id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.not.ok
            expect(res.body).to.be.a('object')
            expect(res.body.code).to.equal(Msg.success.code)
            done()
          })
      })
    })
  })
})
