<template>
<div class="section">
  <h1 class="title">Previous Payouts</h1>
  <table class="table">
    <thead>
      <tr>
        <th>Address</th>
        <th>Amount (FSC)</th>
        <th>Transaction</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(payout, index) in payouts" :key="index">
        <td>{{ payout.address }}</td>
        <td>{{ (payout.amount * 1e-8).toFixed(8) }}</td>
        <td><a :href="urlForPayout(payout)" target="_blank">View</a></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: {
    payouts: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    urlForPayout(payout) {
      return `http://explore.friendshipcoin.com/tx/${payout.txid}`
    }
  }
}
</script>

<style lang="scss" scoped>
table.table {
  margin-left: auto;
  margin-right: auto;
}
</style>
