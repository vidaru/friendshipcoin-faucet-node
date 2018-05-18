import '@/styles/configure.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLocalStorage from 'vue-localstorage'
import NProgress from 'nprogress'

Vue.use(VueAxios, axios)
Vue.use(VueLocalStorage, {})

Vue.config.productionTip = false

axios.interceptors.request.use(function(config) {
  NProgress.start()
  return config
}, function(error) {
  Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
