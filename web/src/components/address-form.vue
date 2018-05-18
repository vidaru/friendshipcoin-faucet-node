<template>
<div class="section">
  <transition name="fade" mode="out-in">
    <div v-if="!success" key="form">
      <h1 class="title">Enter your FSC address</h1>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <input class="input is-big" type="text"
          placeholder="Enter your FSC address"
          v-model="address" />
        </div>
      </div>
      <coin-captcha @verify="onVerify" />
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
        <button class="button is-primary is-large" :class="state" @click="onSubmit">
          Continue
        </button>
        </p>
      </div>
    </div>
    <div v-if="success" key="success">
      <h1 class="title">Your FSC address is entered</h1>
      <h2 class="subtitle">You should receive your payout in the next 10 minutes</h2>
    </div>
  </transition>
</div>
</template>

<script>
import CoinCaptcha from './captcha'
import Entries from '@/api/entries'

export default {
  data() {
    return {
      captcha: '',
      address: '',
      state: '',
      success: false
    }
  },
  components: {
    CoinCaptcha
  },
  methods: {
    onVerify(result) {
      this.captcha = result
    },
    onExpired() {
      this.captcha = ''
    },
    async onSubmit() {
      if (!this.checkData() && this.state === '') { return }
      this.state = 'is-loading'
      try {
        console.log(await Entries.create({ address: this.address, captcha: this.captcha }))
      } catch (error) {
        console.log(error)
      }
      this.state = ''
      this.success = true
      this.captcha = ''
      this.address = ''

      window.setTimeout(() => { this.success = false }, 5000)
    },
    checkData() {
      return this.captcha && this.captcha.length > 0 && this.address && this.address.length > 0
    }
  },
  computed: {
    sitekey() {
      return process.env.GOOGLE_RECAPTCHA_SITE_KEY
    }
  }
}
</script>

<style lang="scss">
div.captcha {
  margin-top: 24px;
  margin-bottom: 24px;
}
div.captcha > div {
  margin-left: auto;
  margin-right: auto;
}

input {
  min-width: 310px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
