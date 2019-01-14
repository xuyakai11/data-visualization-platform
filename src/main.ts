import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css' // 引入antd样式// import 'ant-design-vue/lib/button' // 按需引入按钮样式
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import './services/axios.tool' // 导入封装好的axios
import './registerServiceWorker'
import './assets/common.css'
import axios from 'axios'
import { get, set, remove } from '@/services/localStorage.service'

Vue.use(Antd)
Vue.prototype.$axios = axios
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

router.beforeEach((to: any, from: any, next: any) => { // 用路由跳转来验证是不可取的，应该在请求接口的时候将token带上，后台验证登录状态，返回信息前段验证做出提示
  if (to.path != '/login') {
    const loginToken: any = get("token")
    if (!loginToken) {
      router.push({path: '/'})
    }
    next()
  } else {
    next()
  }
})

// Vue.component(Button.name, Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
