<template>
<div class="section">
  <h2 class="title is-4">We're giving away FSC every 10 minutes!</h2>
  <table class="table is-bordered">
    <thead>
      <tr>
        <th>Amount (FSC)</th>
        <th>Chance</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="odd in odds" :key="odd.prize">
        <th>{{ (odd.prize / 1e8) }}</th>
        <td>{{ Math.round((odd.chance * 100000)) / 1000 }}%</td>
    </tr>
    </tbody>
  </table>
  <h4 class="title is-6">All you have to do is enter your FSC address and solve the captcha!</h4>
</div>
</template>

<script>
export default {
  data() {
    return {
      odds: [{
        prize: 1500000,
        chance: 0.3
      }, {
        prize: 2000000,
        chance: 0.65
      }, {
        prize: 5000000,
        chance: 0.03
      }, {
        prize: 10000000,
        chance: 0.019
      }, {
        prize: 50000000,
        chance: 0.00099
      }, {
        prize: 1000000000,
        chance: 0.00001
      }]
    }
  }
}
</script>

<style scoped>
table.table {
  margin-left: auto;
  margin-right: auto;
}
</style>
