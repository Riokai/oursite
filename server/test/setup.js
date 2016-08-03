// import should from 'should'
require('es6-promise').polyfill()
import request from 'supertest'
// import { app, server } from '../src/app'
import app from '../src/app'
import { expect } from 'chai'

// global.should = should
global.app = app
// global.server = server
global.request = request
global.expect = expect
