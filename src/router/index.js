import Vue from 'vue'
import Router from 'vue-router'
import Paper from '@/components/Paper'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: resolve => require(['../default.vue'], resolve),
      children: [{
        path: '',
        component: resolve => require(['../components/Paper.vue'], resolve),
        meta: {
          title: 'Dashboard',
          breadcrumb: [{
            text: '<i class="ti-home"></i> Dashboard 1',
            href: '/'
          }]
        }
      }]
    },
    {
      path: '/paper',
      name: 'Paper',
      component: Paper
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
