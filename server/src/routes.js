import path from 'path'
import module from './api/module'
import message from './api/message/'
import user from './api/user'
import timeline from './api/timeline'
import qiniu from './api/qiniu'
import album from './api/album'
import auth from './auth'

export default function (app) {
  // app.use('/api/module', module)
  app.use('/api/module', module)
  app.use('/api/message', message)
  app.use('/api/user', user)
  app.use('/auth', auth)
  app.use('/api/qiniu', qiniu)
  app.use('/api/timeline', timeline)
  app.use('/api/album', album)
}
