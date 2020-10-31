import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import store from './store/store';
import {router} from './router';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex);
Vue.use(VueRouter)

import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
