import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const store = new Vuex.Store({
	state: {
		products: null,
		dishes: [],
		categories: [],
		measures: [],
		loading: true,
		user: null,
	},
	getters,
	mutations,
	actions,
	strict: process.env.NODE_ENV !== 'production',
})

export default store
