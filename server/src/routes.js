import path from 'path'
import module from './api/module'
import message from './api/message/'

export default function (app) {
  // app.use('/api/module', module)
  app.use('/api/module', module)
  app.use('/api/message', message)
}
