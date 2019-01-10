import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login' // 从定向到login页
    },
    {
      path: '/login',
      name: 'login',
      meta: { // 设置页面title，和是否隐藏menu标识
        title: 'Login - 登录',
        hideInMenu: true
      },
      component: () => import('./components/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/BigScreenSchool',
      name: 'BigScreenSchool',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "BigScreenSchool" */ './views/BigScreenSchool.vue')
    },
    {
      path: '/APIList',
      name: 'APIList',
      component: () => import('./views/APIList.vue')
    }
  ]
})
