import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'domain.com'
// axios.defaults.headers.common['Authorization'] = 'fsfsfsfs'
// e.g for get requests
axios.defaults.headers.get['Accepts'] = 'application/json'

// using interceptors
axios.interceptors.request.use(config => {
  console.log('request interceptors', config)
  // you can use config.headers['SOMETHING']
  return config
})

axios.interceptors.response.use(res => {
  console.log('response inter', res)
  return res
})

// removing interceptors on some conditions
// const reqInterceptor = axios.interceptors.request.use(config => {
//   console.log('request interceptors', config)
//   return config
// })
// const resInterceptor = axios.interceptors.response.use(res => {
//   console.log('response inter', res)
//   return res
// })

// axios.interceptors.request.eject(reqInterceptor)
// axios.interceptors.response.eject(resInterceptor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
