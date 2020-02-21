import Vue from 'vue'
import Vuex from 'vuex'

import { ipcRenderer as ipc } from 'electron'

Vue.use(Vuex)


const transactions = {
  strict: true,
  state: {
    transactions: []
  },
  mutations: {
    newTransaction: (state, transaction) => state.transactions.push(transaction),
    setTransactions: (state, data) => (state.transactions = data),
    updateTransaction: (state, data) => {
      const i = state.transactions.findIndex(transaction => transaction._id === data._id)
      if (i !== -1) state.transactions.splice(i, 1, data)
    },
    removeTransaction: (state, id) => (state.transactions = state.transactions.filter(transaction => transaction._id !== id))
  },
  actions: {
    getTransactions({ commit }) {
      ipc.send('findQuery', 'transactions')
      ipc.once('findQueryTs', (e, data) => {
        commit('setTransactions', data)
      })
      ipc.once('error', err => { if (err !== null) console.log(err) })

    },
    addTransaction({ commit }, transaction) {
      if (transaction.type === false) {
        transaction.value = -transaction.value;
      }
      if (transaction.location === "") {
        transaction.location === "N/A";
      }
      ipc.send("addQuery", "transactions", transaction);
      commit('newTransaction', transaction);
    },
    updateTransaction({ commit }, transaction) {
      if (transaction.type === false) {
        transaction.value = -transaction.value;
      }
      ipc.send("updateQuery", "transactions", transaction)
      commit('updateTransaction', transaction)
    },
    async removeTransaction({ commit }, transaction) {
      await new Promise((resolve, reject) => {
        ipc.send("removeQuery", "transactions", transaction)
        if (ipc.once('error', err => err === null)) resolve();
      }).then(commit('removeTransaction', transaction._id));
      //*ipc.send("removeQuery", "transactions", transaction)
      //*commit('removeTransaction', transaction._id)
    }
  },
  getters: {
    getAllTransactions(state) {
      return state.transactions
    }
  }

}

const categories = {
  strict: true,
  state: {
    categories: []
  },
  mutations: {
    newCategory: (state, data) => state.categories.push(data),
    setCategories: (state, data) => (state.categories = data)
  },
  actions: {
    getCategories({ commit }) {
      ipc.send('findQuery', 'category')
      ipc.once('findQueryCy', (e, data) => {
        commit('setCategories', data)
      })

    },
    addCategory({ commit }, category) {
      category.color = Math.round(category.color);
      ipc.send("addQuery", "category", category);
      commit('setCategories', category)
    }
  },
  getters: {
    getCategories(state) {
      return state.categories
    }
  }
}

export default new Vuex.Store({
  strict: true,
  modules: {
    transactions,
    categories
  }
})