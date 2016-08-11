import _debug from 'debug'

const debug = _debug('app:config')

debug(`Looking for environment overrides for NODE_ENV "${process.env.NODE_ENV}"`)

export default {
  mongo: {
    uri: 'mongodb://localhost/oursite-test'
  },
  secrets: {
    session: 'oursite'
  },
  qiniu: {
    AccessKey: 'oxBowt2F4le6E0e6fobAIJ1VRH0JucG_hdkU7x8j',
    SecretKey: 'NGiqHBhMj5-hD0HW9uDc186VddU7ftKzbxldCWQ8',
    bucket: 'riosite'
  }
}
