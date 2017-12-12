import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',// hash, hsitroy    TODO: history with IIS
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requireAuth: false}
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['../pages/Home.vue'], resolve),
      meta: { requireAuth: true}
    }
  ]
})
