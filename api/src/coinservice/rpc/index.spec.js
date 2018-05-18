const sinon = require('sinon')
const jayson = require('jayson/promise')
const RPC = require('./index')

describe('the rpc client', function() {
  before(function() {
    this.client = { request: sinon.stub() }
    this.http = sinon.stub(jayson.client, 'http').returns(this.client)
  })

  after(function() {
    this.http.restore()
  })

  describe('creating the client', function() {
    const port = 200
    const user = 'elliott'
    const password = 'something-secure'

    beforeEach(async function() {
      this.rpc = new RPC({ port, user, password })
    })

    it('should have the correct port set', function() {
      this.rpc.port.should.equal(200)
    })


    it('should have the correct user set', function() {
      this.rpc.user.should.equal('elliott')
    })

    it('should have the correct password set', function() {
      this.rpc.password.should.equal('something-secure')
    })

    it('should create a client to connect', function() {
      const auth = new Buffer('elliott:something-secure').toString('base64')
      this.http.should.be.calledWith({
        port: 200,
        headers: {
          'Authorization': `Basic ${auth}`
        }
      })
    })
    describe('calling a request', function() {
      const method = 'something'
      const params = ['a', 'boo']
      const result = 'hello'

      beforeEach(async function() {
        this.client.request.resolves(result)
        this.result = await this.rpc.request(method, params)
      })

      it('should call the client', function() {
        this.client.request.should.be.calledWith(method, params)
      })

      it('should return the result of the call', function() {
        this.result.should.equal(result)
      })
    })
  })
})
