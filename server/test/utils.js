import Msg from '../src/config/message'

export const user = {
  nickname: 'kai',
  email: '489272441@qq.com',
  password: '1234567'
}

export const message = {
  content: '12345'
}

export function signin (cb) {
  request(app)
    .post('/api/user')
    .send(user)
    .expect(200)
    .end((err, res) => {
      expect(err).to.be.not.ok

      expect(res).to.be.a('object')
      const token = res.body.data.token
      expect(token).to.be.a('string')
      expect(token).to.have.lengthOf(172)
      cb(token)
    })
}

export function createMessage (token, cb) {
  request(app)
    .post('/api/message')
    .set('Authorization', `Bearer ${token}`)
    .send(message)
    .expect(200)
    .end((err, res) => {
      expect(err).to.be.not.ok
      expect(res).to.be.a('object')
      expect(res.body.code).to.equal(Msg.success.code)
      expect(res.body.data).to.be.a('object')
      expect(res.body.data.content).to.equal(message.content)
      cb(res.body.data)
    })
}
