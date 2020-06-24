import { ipcRenderer as ipc } from 'electron-better-ipc'
import { ToastProgrammatic as Toast } from 'buefy'

function sortBy(data, by) {
    return data.sort((a, b) => {
        return a.date < b.date;
    });
}

const transactions = {
    strict: true,
    state: {
        transactions: []
    },
    mutations: {
        newTransaction: (state, transaction) => {
            state.transactions.push(transaction)
            sortBy(state.transactions, 'date')
        },
        setTransactions: (state, data) => (state.transactions = data),
        updateTransaction: (state, data) => {
            const i = state.transactions.findIndex(transaction => transaction._id === data._id)
            if (i !== -1) state.transactions.splice(i, 1, data)
        },
        removeTransaction: (state, id) => (state.transactions = state.transactions.filter(transaction => transaction._id !== id)),
        removeTransactions: (state, id) => (state.transactions = state.transactions.filter(transaction => transaction.account !== id))
    },
    actions: {
        async fetchTransactions({ commit }) {
            await ipc.callMain('fetchTransactions')
                .then(resolve => {
                    commit('setTransactions', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async addTransaction({ commit }, transaction) {
            // make transaction negative 
            if (transaction.type === false && transaction.value >= 0 || transaction.type !== false && transaction.value < 0) {
                transaction.value = -transaction.value;
            }
            // location check
            if (transaction.location === "") {
                transaction.location === "N/A";
            }
            await ipc.callMain('addTransaction', transaction)
                .then(resolve => {
                    Toast.open({
                        message: `Transaction ${resolve.text.substring(0, 30)} added!`,
                        position: 'is-bottom'
                    })
                    commit('newTransaction', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async updateTransaction({ commit }, transaction) {
            // make a expense a negative value
            if (transaction.type === false && transaction.value >= 0 || transaction.type !== false && transaction.value < 0) {
                transaction.value = -transaction.value;
            }
            await ipc.callMain('updateTransaction', transaction)
                .then(resolve => {
                    Toast.open({
                        message: `Transaction ${resolve.text.substring(0, 30)} updated!`,
                        position: 'is-bottom'
                    })
                    commit('updateTransaction', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async removeTransaction({ commit }, transaction) {
            await ipc.callMain('removeTransaction', transaction)
                .then(() => {
                    Toast.open({
                        message: `Transaction ${transaction.text.substring(0, 30)} removed!`,
                        type: 'is-danger',
                        position: 'is-bottom'
                    })
                    commit('removeTransaction', transaction._id)
                })
                .catch(reason => {
                    Toast.open({
                        message: `Error ${reason}`,
                        type: 'is-danger',
                        position: 'is-bottom'
                    })
                })
        },
        async removeTransactions({ commit }, accountId) {
            commit('removeTransactions', accountId)
        }
    },
    getters: {
        getAllTransactions(state, getters, rootState) {
            return state.transactions.filter(transaction => new Date(transaction.date).getFullYear() === rootState.year || transaction.date.length === 0)
        },
        getTransaction: (state) => (id) => {
            if (state.transactions.find(transaction => transaction._id === id) !== undefined) {
                return state.transactions.find(transaction => transaction._id === id)
            } else {
                return { name: "Undefined!" }
            }
        },
        getTransactionsByAccount: (state) => (id) => {
            return state.transactions.filter(transaction => transaction.account === id) !== undefined ? state.transactions.filter(transaction => transaction.account === id) : { name: "Undefined!" }
        },
        getTotalValue: (state, getters, rootState) => {
            let total = 0.00
            state.transactions.forEach(trans => {
                if (new Date(trans.date).getFullYear() <= rootState.year) {
                    total += Number(trans.value)
                }
            });
            return total
        }
    }
}
export default transactions