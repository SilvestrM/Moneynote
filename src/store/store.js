import Vue from 'vue'
import Vuex from 'vuex'

import transactions from './modules/transactions'
import categories from './modules/categories'
import accounts from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    year: new Date().getFullYear(),
    currency: 'CZK'
  },
  mutations: {
    SET_YEAR: (state, year) => {
      state.year = year
    },
    SET_CURRENCY: (state, currency) => {
      state.currency = currency
    }
  },
  modules: {
    transactions,
    categories,
    accounts
  }
})