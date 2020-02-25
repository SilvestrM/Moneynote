import { ipcRenderer as ipc } from 'electron-better-ipc'
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
            const data = await ipc.callMain('fetchAccounts')
            commit('setAccounts', data)
        },
        addAccount({ commit }, account) {
            ipc.send("addQuery", "account", account);
            commit('setAccounts', account)
        },
        updateAccount({ commit }, account) {
            ipc.send("updateQuery", "account", account)
            commit('updateAccount', account)
        },
        removeAccount({ commit }, account) {
            ipc.send("removeQuery", "account", account)
            commit('removeAccount', account._id)
        }
    },
    getters: {
        getAccounts(state) {
            return state.accounts
        }
    }
}

export default accounts