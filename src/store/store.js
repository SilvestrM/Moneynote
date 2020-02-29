import Vue from 'vue'
import Vuex from 'vuex'

import transactions from './modules/transactions'
import categories from './modules/categories'
import accounts from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    year: Date
  },
  modules: {
    transactions,
    categories,
    accounts
  }
})