<template>
  <div id="app" class="container has-text-centered">
    <div class="section">
      <img id="logo" src="./assets/logo.svg">
      <a href="/"><h1 class="title is-2">FriendshipCoin Faucet</h1></a>
      <h2 class="subtitle is-3">Get your free FSC!</h2>
    </div>
    <info />
    <address-form />
    <payouts-table :payouts="payouts" />
  </div>
</template>

<script>
import Info from '@/components/info'
import AddressForm from '@/components/address-form'
import PayoutsTable from '@/components/payouts-table'
import Payouts from '@/api/payouts'
import Advert from '@/components/advert'
import AnonAdvert from '@/components/anon-ad'

export default {
  name: 'App',
  components: {
    Info, AddressForm, PayoutsTable, Advert, AnonAdvert
  },
  data() {
    return {
      payouts: []
    }
  },
  mounted() {
    window.setInterval(() => {
      this.reloadPayouts()
    }, 120 * 1e3)
    this.reloadPayouts()
  },
  methods: {
    async reloadPayouts() {
      this.payouts = await Payouts.read()
    }
  }
}
</script>

<style>
#logo {
  width: 120px;
}

</style>
