'use strict'

const coinHive = process.env.COINHIVE_RECAPTCHA_SITE_KEY || ''
const numberHashes = process.env.COINHIVE_NUMBER_HASHES || '256'

module.exports = {
  NODE_ENV: '"production"',
  COINHIVE_RECAPTCHA_SITE_KEY: `"${coinHive}"`,
  COINHIVE_NUMBER_HASHES: `"${numberHashes}"`
}
