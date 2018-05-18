import axios from 'axios'

export default {
  async read({ limit = 20 } = {}) {
    const response = await axios.get('/api/payouts', { limit })
    return response.data
  }
}
