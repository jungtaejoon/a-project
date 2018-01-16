import Vue from 'vue'
import Router from 'vue-router'
import Paper from '@/components/Paper'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Paper',
      component: Paper
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
