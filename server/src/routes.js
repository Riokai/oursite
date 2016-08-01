import path from 'path'
import module from './api/module'

export default function (app) {
  // app.use('/api/module', module)
  app.use('/api/module', module)
}
