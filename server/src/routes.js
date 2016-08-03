import path from 'path'
import module from './api/module'
import message from './api/message/'
import user from './api/user'
import auth from './auth'
import timeline from './api/timeline'

export default function (app) {
  // app.use('/api/module', module)
  app.use('/api/module', module)
  app.use('/api/message', message)
  app.use('/api/user', user)
  app.use('/auth', auth)
  app.use('/timeline', timeline)
}
