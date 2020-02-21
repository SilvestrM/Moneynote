import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

Vue.use(Vuex)
Vue.use(Buefy)

Vue.config.productionTip = false
//Vue.prototype.$ipc = ipcRenderer

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
