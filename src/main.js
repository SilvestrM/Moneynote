import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

import { ipcRenderer as ipc } from 'electron'

Vue.use(Vuex)
Vue.use(Buefy)

Vue.config.productionTip = false
//Vue.prototype.$ipc = ipcRenderer

//errors
window.onerror = (error, url, line) => {
  ipc.send('renderError', error)
}
ipc.on('error', (e, err) => console.log('renderer error', err))

import moment from "moment";
Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("Do MMM YYYY");
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
