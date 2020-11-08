import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './store/store'
import { router } from './router'
import firebase from 'firebase'
import Vuelidate from 'vuelidate'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuelidate)

import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false

new Vue({
	render: (h) => h(App),
	store,
	router,
	created() {
		// Initialize Firebase
		firebase.initializeApp({
			apiKey: 'AIzaSyDLaUqyHSRDNZqB7XaXXoz1ji4Fl338iRY',
			authDomain: 'home-helper-9180e.firebaseapp.com',
			databaseURL: 'https://home-helper-9180e.firebaseio.com',
			projectId: 'home-helper-9180e',
			storageBucket: 'home-helper-9180e.appspot.com',
			messagingSenderId: '708149006827',
			appId: '1:708149006827:web:aa7393c92db3de043849ae',
		})

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('SET_USER_SESSION', user)
			}
		})
	},
}).$mount('#app')
