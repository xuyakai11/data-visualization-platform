import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css' // 引入antd样式
// import 'ant-design-vue/lib/button' // 按需引入按钮样式
import './axios.tool' // 导入封装好的axios
import './registerServiceWorker'
import './assets/common.css'

Vue.config.productionTip = true

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
