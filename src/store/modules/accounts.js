import { ipcRenderer as ipc } from 'electron-better-ipc'
import { ToastProgrammatic as Toast } from 'buefy'

const accounts = {
    strict: true,
    state: {
        accounts: []
    },
    mutations: {
        newAccount: (state, data) => state.accounts.push(data),
        setAccounts: (state, data) => (state.accounts = data),
        updateAccount: (state, data) => {
            const i = state.accounts.findIndex(account => account._id === data._id)
            if (i !== -1) state.accounts.splice(i, 1, data)
        },
        removeAccount: (state, id) => (state.accounts = state.accounts.filter(account => account._id !== id))
    },
    actions: {
        async fetchAccounts({ commit }) {
            await ipc.callMain('fetchAccounts')
                .then(resolve => {
                    commit('setAccounts', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async addAccount({ commit }, account) {
            await ipc.callMain('addAccount', account)
                .then(resolve => {
                    Toast.open({
                        message: `Account ${resolve.name} added!`,
                        position: 'is-bottom'
                    })
                    commit('newAccount', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async updateAccount({ commit }, account) {
            await ipc.callMain('updateAccount', account)
                .then(resolve => {
                    Toast.open({
                        message: `Account ${resolve.name} updated!`,
                        position: 'is-bottom'
                    })
                    commit('updateAccount', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        updateBalance({ commit }, account) {
            if (account !== undefined) commit('updateAccount', account)
        },
        async removeAccount({ commit }, account) {
            await ipc.callMain('removeAccount', account)
                .then(() => {
                    Toast.open({
                        message: `Account ${account.name} deleted!`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                    commit('removeAccount', account._id)
                })
                .catch(reason => {
                    throw reason;
                })
        }
    },
    getters: {
        getAccounts(state) {
            return state.accounts
        },
        getAccount: (state) => (id) => {
            const data = state.accounts.find(account => account._id === id) !== undefined ? state.accounts.find(account => account._id === id) : { name: "Undefined!" }
            return data
        },
        getTotal: (state) => {
            let total = 0.00
            state.accounts.forEach(account => { total += account.balance });
            return total
        }
    }
}

export default accounts