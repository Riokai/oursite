import should from 'should'
import Module from '../../src/api/module/model'
import Msg from '../../src/config/message'

describe('API: Module', function() {

  before((done) => {
    Module.remove().exec().then(() => {
      done()
    });
  })

  afterEach((done) => {
    Module.remove().exec().then(() => {
      done()
    })
  })

  it('读取所有模块', (done) => {
    request(app)
      .get('/api/module')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        expect(err).to.be.not.ok
        expect(res.body).to.be.a('object')
        expect(res.body.code).to.equal(Msg.success.code)
        expect(res.body.data).to.be.a('array')
        done()
      })
  })


  it('保存一个合法模块应该成功', (done) => {
    var module = {
      name: '时光轴',
      href: 'http://www.baidu.com',
      color: 'red'
    }

    request(app)
      .post('/api/module')
      .type('json')
      .send(module)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err)
        should.not.exist(err)
        should.exist(res)
        done()
      })
  })

  it('更新一个合法模块应该成功', (done) => {
    var module = {
      name: '时光轴',
      href: 'http://www.baidu.com',
      color: 'red'
    }

    var id = ''

    request(app)
      .post('/api/module')
      .type('json')
      .send(module)
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)

        id = res.body._id

        request(app)
          .put('/api/module/' + id)
          .type('json')
          .send({
            name: '留言板'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err)

            should.not.exist(err)
            should.exist(res)
            done()
          })
      })
  })
})
