import Vue from 'vue'
import Router from 'vue-router'
import Overview from './views/Overview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'overview',
      component: Overview
    },
    {
      path: '/transactions',
      name: 'transactions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Transactions.vue')
    },
    {
      path: '/controls',
      name: 'controls',
      component: () => import('./views/Controls.vue'),
      children: [{
        path: 'accounts',
        name: 'accounts',
        component: () => import('./views/Accounts.vue'),
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('./views/Categories.vue'),
      }
      ]
    }
  ]
})
