import Vue from 'vue'
import Vuex from 'vuex'

import { ipcRenderer as ipc } from 'electron'

import transactions from './modules/transactions'
import categories from './modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    transactions,
    categories
  }
})