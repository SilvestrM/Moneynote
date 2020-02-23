import Vue from 'vue'
import Vuex from 'vuex'

import transactions from './modules/transactions'
import categories from './modules/categories'
import accounts from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    transactions,
    categories,
    accounts
  }
})