const controller = require('./controller')
const recaptcha = require('../../recaptcha')

exports.createEntry = async function(ctx) {
  const address = ctx.request.body.address
  const captcha = ctx.request.body.captcha

  await recaptcha.validate(captcha)

  const ip = ctx.request.ip
  const entry = await controller.create({ address, ip })

  ctx.body = {'success': true}
}

exports.routes = function(router) {
  router.post('/', this.createEntry)
  return router
}
