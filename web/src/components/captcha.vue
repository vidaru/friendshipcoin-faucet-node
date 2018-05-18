<template>
<div class="coinhive-captcha" :data-hashes="hashes" :data-key="sitekey"
  data-whitelabel="true" data-callback="captchaCallback" ref="captcha">
  <em>Loading Captcha...<br>
    If it doesn't load, please disable Adblock!</em>
</div>
</template>

<script>
export default {
  computed: {
    sitekey() {
      return process.env.COINHIVE_RECAPTCHA_SITE_KEY
    },
    hashes() {
      return process.env.COINHIVE_NUMBER_HASHES
    }
  },
  mounted() {
    if (!window.captchaCallback) {
      window.captchaCallback = (token) => {
        this.captchaCallback(token)
      }
    }
    window.setTimeout(() => {
      window.CoinHive.Captcha.ElementsCreated = false
      window.CoinHive.Captcha.CreateElements()
    }, 500)
  },
  methods: {
    captchaCallback(token) {
      this.$emit('verify', token)
    }
  }
}
</script>
