const sinon = require('sinon')
const mongoose = require('mongoose')
const config = require('../configuration')
const database = require('./index')

describe('connecting to the database', function() {
  before(function() {
    this.on = sinon.stub(mongoose.connection, 'on')
    this.once = sinon.stub(mongoose.connection, 'once')
    this.connect = sinon.stub(mongoose, 'connect')
    this.once.yields()
  })

  after(function() {
    this.connect.restore()
    this.on.restore()
    this.once.restore()
  })

  beforeEach(async function() {
    await database.connect()
  })

  it('should connect to mongoose', function() {
    const url = config.get('MONGO_URL')
    const db = config.get('MONGO_DATABASE_NAME')
    this.connect.should.be.calledWith(`${url}/${db}`, {
      promiseLibrary: global.Promise
    })
  })

  it('should call on', function() {
    this.on.should.be.calledWith('error')
  })

  it('should add a handler for once', function() {
    this.once.should.be.calledWith('open')
  })
})

describe('closing the database connection', function() {
  before(function() {
    this.close = sinon.stub(mongoose.connection, 'close')
    this.close.resolves()
  })

  after(function() {
    this.close.restore()
  })

  beforeEach(async function() {
    await database.close()
  })

  it('should call close', function() {
    this.close.should.be.called
  })
})
