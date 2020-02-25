import { ipcRenderer as ipc } from 'electron-better-ipc'

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
        async getTransactions({ commit }) {
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
            if (transaction.type === false && transaction.value >= 0) {
                transaction.value = -transaction.value;
            }
            // location check
            if (transaction.location === "") {
                transaction.location === "N/A";
            }

            await ipc.callMain('addTransaction', transaction)
                .then(() => {
                    commit('newTransaction', transaction)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async updateTransaction({ commit }, transaction) {
            // make a expense a negative value
            if (transaction.type === false && transaction.value >= 0) {
                transaction.value = -transaction.value;
            }
            await ipc.callMain('updateTransaction', transaction)
                .then(resolve => {
                    commit('updateTransaction', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async removeTransaction({ commit }, transaction) {
            await ipc.callMain('removeTransaction', transaction)
                .then(() => {
                    commit('removeTransaction', transaction._id)
                })
                .catch(reason => {
                    throw reason;
                })
        }
    },
    getters: {
        getAllTransactions(state) {
            return state.transactions
        },
        getTransaction: (state) => (id) => {
            const data = state.transactions.find(transaction => transaction._id === id) !== undefined ? state.transactions.find(transaction => transaction._id === id) : { name: "Undefined!" }
            return data
        }
    }
}
export default transactions