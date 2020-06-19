import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

import { ipcRenderer as ipc } from 'electron'

Vue.use(Vuex)
Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})

Vue.config.productionTip = false

Vue.prototype.$tagColor = { s: '40%', l: '50%' }


//errors
window.onerror = (error, url, line) => {
  ipc.send('renderError', error, url, line)
}
// eslint-disable-next-line
ipc.on('error', (e, err) => console.error('renderer error', err))

// eslint-disable-next-line
process.on('unhandledRejection', error => {
  console.error(error)
})

import moment from "moment";
import formatDateMixin from './mixins/formatDate'
import formatNumberMixin from './mixins/formatNumber'

Vue.mixin(formatDateMixin);
Vue.mixin(formatNumberMixin);

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
