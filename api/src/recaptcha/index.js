const Captcha = require('recaptcha2')
const config = require('../configuration')
const siteKey = config.get('COINHIVE_RECAPTCHA_SITE_KEY')
const secretKey = config.get('COINHIVE_RECAPTCHA_SECRET_KEY')
const hashes = config.get('COINHIVE_NUMBER_HASHES')
const request = require('request-promise-native')

module.exports = {
  async validate(token) {
    const url = 'https://api.coinhive.com/token/verify'
    const body = {
      token, hashes, secret: secretKey
    }

    const result = JSON.parse(await request.post(url).form(body))

    if (result.success !== true) {
      throw new Error('Did not validate POW')
    }
  }
}
