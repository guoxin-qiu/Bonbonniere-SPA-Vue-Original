import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // hash, history
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requireAuth: false }
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['../views/Home.vue'], resolve),
      meta: { requireAuth: true }
    },
    {
      path: '/User',
      name: 'User',
      component: resolve => require(['../views/User.vue'], resolve),
      meta: { requireAuth: true }
    }
  ]
})
