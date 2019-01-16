import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle: '', // 页面标题
    openKeys: '' //
  },
  mutations: {
    changeOpenKeys (state, data) {
      if (data) {
        sessionStorage.setItem('openKeys', data.openKeys)
      } else { 
        state.openKeys = sessionStorage.getItem('openKeys') || '';
      }
    }
  },
  actions: {}
})
