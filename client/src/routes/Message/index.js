import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'message',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Message = require('./containers/MessageContainer').default
      const reducer = require('./modules/Message').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Message', reducer })

      /*  Return getComponent   */
      cb(null, Message)

    /* Webpack named bundle   */
    }, 'Message')
  }
})
