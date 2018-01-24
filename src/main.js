// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  store.commit('routeChange', 'start')
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta.title
  store.commit('routeChange', 'end')
  if (window.innerWidth < 992) {
    store.commit('left_menu', 'close')
  } else {
    store.commit('left_menu', 'open')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
