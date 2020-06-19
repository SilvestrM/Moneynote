import Vue from 'vue'
import Vuex from 'vuex'

import { ipcRenderer as ipc } from 'electron-better-ipc'
import { ToastProgrammatic as Toast } from 'buefy'

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
  actions: {
    async initApp({ dispatch }) {
      await dispatch('fetchTransactions')
      await dispatch('fetchCategories')
      await dispatch('fetchAccounts')
      await dispatch('fetchSettings')
    },
    async fetchSettings({ commit }) {
      await ipc.callMain('fetchSettings')
        .then(res => {
          commit('SET_CURRENCY', res.currency)
        })
        .catch(err => {
          Toast.open({
            message: `Error ${err}!`,
            type: 'is-danger',
            position: 'is-bottom'
          })
        })
    },
    async setCurrency({ commit }, currency) {
      await ipc.callMain('updateCurrency', currency)
        .then(() => {
          commit('SET_CURRENCY', currency)
        })
        .catch(err => {
          Toast.open({
            message: `Error ${err}!`,
            type: 'is-danger',
            position: 'is-bottom'
          })
        })
    }
  },
  modules: {
    transactions,
    categories,
    accounts
  }
})