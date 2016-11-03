import _debug from 'debug'

const debug = _debug('app:config')

debug(`Looking for environment overrides for NODE_ENV "${process.env.NODE_ENV}"`)

export default {
  mongo: {
    uri: 'mongodb://localhost/oursite-test'
  },
  secrets: {
    session: 'oursite'
  }
}
