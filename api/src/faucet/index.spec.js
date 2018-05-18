const sinon = require('sinon')
const faucet = require('./index')

describe('Getting a reward', function() {
  const tests = [{
    value: 5,
    expected: 0.015e8
  }, {
    value: 30001,
    expected: 0.02e8
  }, {
    value: 100000,
    expected: 10e8
  }, {
    value: 99999,
    expected: 0.5e8
  }, {
    value: 99900,
    expected: 0.1e8
  }, {
    value: 96000,
    expected: 0.05e8
  }, {
    value: 92307,
    expected: 0.02e8
  }]

  tests.forEach((test) => {
    it(`should return the correct reward for ${test.value}`, function() {
      const reward = faucet.rewardForValue(test.value)
      reward.should.equal(test.expected)
    })
  })
})
