import { ipcRenderer as ipc } from 'electron'
const categories = {
    strict: true,
    state: {
        categories: []
    },
    mutations: {
        newCategory: (state, data) => state.categories.push(data),
        setCategories: (state, data) => (state.categories = data),
        updateCategory: (state, data) => {
            const i = state.categories.findIndex(category => category._id === data._id)
            if (i !== -1) state.categories.splice(i, 1, data)
        },
        removeCategory: (state, id) => (state.categories = state.categories.filter(category => category._id !== id))
    },
    actions: {
        fetchCategories({ commit }) {
            ipc.send('findQuery', 'category')
            ipc.once('findQueryCy', (e, data) => {
                commit('setCategories', data)
            })

        },
        addCategory({ commit }, category) {
            category.color = Math.round(category.color);
            ipc.send("addQuery", "category", category);
            commit('newCategory', category)
        },
        updateCategory({ commit }, category) {
            category.color = Math.round(category.color);
            ipc.send("updateQuery", "category", category)
            commit('updateCategory', category)
        },
        removeCategory({ commit }, category) {
            ipc.send("removeQuery", "category", category)
            commit('removeCategory', category._id)
        }
    },
    getters: {
        getCategories(state) {
            return state.categories
        }
    }
}

export default categories