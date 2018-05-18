const sinon = require('sinon')
const { expect } = require('chai')
const middleware = require('./index')

describe('the error middleware', function() {

  const ctx = { app: {} }

  before(function() {
    this.nextStub = sinon.stub()
    ctx.app.emit = sinon.stub()
  })

  beforeEach(async function() {
    await middleware(ctx, this.nextStub)
  })

  context('with a successful next', function() {

    before(function() {
      this.nextStub.resolves()
    })

    it('should call next', function() {
      this.nextStub.should.be.calledWith()
    })
  })

  context('with a throwing next', function() {
    const error = new Error('Some error happened')
    before(function() {
      this.nextStub.rejects(error)
    })

    it('should call next', function() {
      this.nextStub.should.be.calledWith()
    })

    it('should set the status of the ctx to 500', function() {
      ctx.status.should.equal(500)
    })

    it('should set the body of the ctx to the error message', function() {
      ctx.body.should.equal('Some error happened')
    })

    it('should emit the error', function() {
      ctx.app.emit.should.be.calledWith('error', error, ctx)
    })

    context('with a status assigned to the error', function() {
      before(function() {
        error.status = 403
      })

      it('should set the correct ctx status', function() {
        ctx.status.should.equal(403)
      })
    })
  })
})
