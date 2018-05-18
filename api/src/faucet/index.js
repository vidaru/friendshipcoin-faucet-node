const schedule = require('node-schedule')
const Entries = require('../api/entries/controller')
const Payouts = require('../api/payouts/controller')
const { faucet } = require('../config.json')
const rn = require('random-number')
const CoinService = require('../coinservice')
const Mailer = require('../mailer')

class Faucet {

  constructor({ minutes }) {
    this.minutes = minutes
    this.service = new CoinService()
    this.mailer = new Mailer()
  }

  async start() {
    this.job = schedule.scheduleJob(`*/${this.minutes} * * * *`, async () => {
      await this.runFaucet()
    })
  }

  async runFaucet() {
    const entries = await Entries.read()
    await Entries.clear()

    if (entries.length == 0) { return }

    const gen = rn.generator({
      min: faucet.min,
      max: faucet.max,
      integer: true
    })

    const entryRewards = entries.map((e) => {
      const value = gen()
      const reward = this.rewardForValue(value)
      const entry = e.toObject()
      entry.amount = reward
      entry.roll = value
      return entry
    })

    const prizes = entryRewards.reduce((res, e) => {
      console.log(e)
      res[e.address] = (e.amount / 1e8)
      return res
    }, {})

    const txid = await this.service.sendToMany(prizes)
    await this.createPayouts({ entries: entryRewards, txid })
    await this.checkBalance()
  }

  rewardForValue(value) {
    const rewards = faucet.rewards
    return rewards.reduce((res, reward) => {
      const max = reward.chance + res.previous
      const min = res.previous
      if (value <= max && value > min) {
        res.prize = reward.prize
      }
      res.previous = max
      return res
    }, { previous: 0, prize: 0 }).prize
  }

  async checkBalance() {
    const balance = await this.service.getBalance()
    if (balance < 100) {
      const address = await this.service.getNewAddress()
      this.mailer.sendLowCoinMail({ address, balance })
    }
  }

  async createPayouts({ entries, txid }) {
    const creates = entries.map((entry) => {
      return Payouts.create({ address: entry.address, ip: entry.ip,
        amount: entry.amount, txid: txid, roll: entry.roll })
    })
  }
}

module.exports = new Faucet({ minutes: 10 })
