import { ipcRenderer as ipc } from 'electron'
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
        },
        updateCategory({ commit }, category) {
            /*ipc.send("updateQuery", "transactions", transaction)
            commit('updateTransaction', transaction)*/
        },
        removeCategory({ commit }, category) {
            //*ipc.send("removeQuery", "transactions", transaction)
            //*commit('removeTransaction', transaction._id)
        }
    },
    getters: {
        getCategories(state) {
            return state.categories
        }
    }
}

export default categories;