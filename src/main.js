import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import mixin from "./mixin";

var Web3 = require('web3')
var VueWeb3 = require('vue-web3')

Vue.use(VueWeb3, { web3: new Web3(Web3.currentProvider) })

Vue.mixin(mixin);
Vue.use(VueAxios, axios)

import QrcodeVue from 'qrcode.vue'
Vue.component("QrcodeVue", QrcodeVue);

/* styles */
import "@/assets/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
