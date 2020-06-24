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
    settings: {
      currency: 'CZK',
      fullscreen: false,
      trayMinimze: true
    }

  },
  mutations: {
    SET_YEAR: (state, year) => {
      state.year = year
    },
    SET_SETTINGS: (state, settings) => {
      state.settings = settings
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
          commit('SET_SETTINGS', res)
        })
        .catch(err => {
          Toast.open({
            message: `Error ${err}!`,
            type: 'is-danger',
            position: 'is-bottom'
          })
        })
    },
    async updateSettings({ commit }, settings) {
      await ipc.callMain('updateSettings', settings)
        .then(res => {
          commit('SET_SETTINGS', res)
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