import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css' // 引入antd样式// import 'ant-design-vue/lib/button' // 按需引入按钮样式
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import './services/axios.tool' // 导入封装好的axios
import './assets/common.css'

/* import moment from 'moment' // 时间格式转换
import 'moment/locale/zh-cn'
moment.locale('zh-cn') */

Vue.use(Antd)
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

/* Vue.filter('datafmt',function (input:any,fmtstring:any) {
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring);
}); */

// Vue.component(Button.name, Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
