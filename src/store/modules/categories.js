import { ipcRenderer as ipc } from 'electron-better-ipc'
import { ToastProgrammatic as Toast } from 'buefy'

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
        async fetchCategories({ commit }) {
            await ipc.callMain('fetchCategories')
                .then(resolve => {
                    commit('setCategories', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async addCategory({ commit }, category) {
            //rounding the color
            category.color = Math.round(category.color);
            await ipc.callMain('addCategory', category)
                .then(resolve => {
                    Toast.open({
                        message: `Category ${resolve.name} added!`,
                        position: 'is-bottom'
                    })
                    commit('newCategory', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async updateCategory({ commit }, category) {
            category.color = Math.round(category.color);
            await ipc.callMain('updateCategory', category)
                .then(resolve => {
                    Toast.open({
                        message: `Category ${resolve.name} updated!`,
                        position: 'is-bottom'
                    })
                    commit('updateCategory', resolve)
                })
                .catch(reason => {
                    throw reason;
                })
        },
        async removeCategory({ commit }, category) {
            await ipc.callMain('removeCategory', category)
                .then(() => {
                    Toast.open({
                        message: `Category ${category.name} removed!`,
                        type: 'is-danger',
                        position: 'is-bottom'
                    })
                    commit('removeCategory', category._id)
                })
                .catch(reason => {
                    throw reason;
                })
        }
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
        getCategory: (state) => (id) => {
            const data = state.categories.find(category => category._id === id) !== undefined ? state.categories.find(category => category._id === id) : { name: "Undefined!", color: "348" }
            return data
        }
    }
}
export default categories