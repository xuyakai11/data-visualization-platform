import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios.tool' // 导入封装好的axios
import './registerServiceWorker'
import './assets/common.css'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
