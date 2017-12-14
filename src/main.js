// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './utils/auth'
import stores from './store/index'
require('./mock/mock-api.js')
require('./mock/mock-database-init')

Vue.config.productionTip = false

Vue.prototype.$isAuthenticated = function(){
  return auth.isAuthenticated()
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (auth.isAuthenticated()) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: stores,
  template: '<App/>',
  components: {
    App
  },
  // watch:{
  //   '$route': 'checkLogin'
  // }
})
