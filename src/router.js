import Vue from 'vue'
import Router from 'vue-router'
import Overview from './views/Overview.vue'
import Controls from './views/Controls.vue'
import Transactions from './views/Transactions/Transactions.vue'

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
      component: Transactions
    },
    {
      path: '/controls',
      name: 'controls',
      component: Controls,
      // redirect: to => {
      //   return '/controls/accounts'
      // },
      // children: [{
      //   path: 'accounts',
      //   name: 'accounts',
      //   component: () => import('./views/Accounts.vue'),
      // },
      // {
      //   path: 'categories',
      //   name: 'categories',
      //   component: () => import('./views/Categories.vue'),
      // }
      // ]
    }
  ]
})
