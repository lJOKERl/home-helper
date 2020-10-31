import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let baseURL = 'http://localhost:3000/'

const store = new Vuex.Store({
	state: {
		products: [],
		dishes: [],
		categories: ['все', 'овощи', 'мясо', 'фрукты'],
		category: 'овощи',
	},
	getters: {
		GET_PRODUCTS_LENGTH(state) {
			return state.products.length
		},
	},
	mutations: {
		SET_PRODUCTS(state, payload) {
			state.products = payload.reverse()
		},
		SET_DISHES(state, payload) {
			state.dishes = payload.reverse()
		},
	},
	actions: {
		async GET_PRODUCTS({ commit }) {
			try {
				let { data } = await axios.get(baseURL + 'products')
				commit('SET_PRODUCTS', data)
			} catch (error) {
				console.error('Ошибка в [GET_PRODUCTS]: ' + error.message)
			}
		},
		async GET_DISHES({ commit }) {
			try {
				let { data } = await axios.get(baseURL + 'dishes')
				commit('SET_DISHES', data)
			} catch (error) {
				console.error('Ошибка в [GET_DISHES]: ' + error.message)
			}
		},
		async ADD_PRODUCT({ commit }, product) {
			try {
				await axios.post(baseURL + 'products/', product)

				let { data } = await axios.get(baseURL + 'products')
				commit('SET_PRODUCTS', data)
			} catch (error) {
				console.error('Ошибка в [DELETE_PRODUCT]: ' + error.message)
			}
		},
		async DELETE_PRODUCT({ commit }, id) {
			try {
				// console.log(baseURL + "users/" + id)
				await axios.delete(baseURL + 'products/' + id)
				let { data } = await axios.get(baseURL + 'products')

				commit('SET_PRODUCTS', data)
			} catch (error) {
				console.error('Ошибка в [DELETE_PRODUCT]: ' + error.message)
			}
		},
		async DELETE_DISH({ commit }, id) {
			try {
				// console.log(baseURL + "users/" + id)
				await axios.delete(baseURL + 'dishes/' + id)
				let { data } = await axios.get(baseURL + 'dishes')

				commit('SET_DISHES', data)
			} catch (error) {
				console.error('Ошибка в [DELETE_DISH]: ' + error.message)
			}
		},
	},
	strict: process.env.NODE_ENV !== 'production',
})

export default store
