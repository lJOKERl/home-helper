import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

let baseURL = 'http://localhost:3000/'

const store = new Vuex.Store({
	state: {
		products: [],
		dishes: [],
		categories: [],
		measuares: [],
		loading: true,
		user: null,
	},
	getters: {
		LOADING: (state) => state.loading,
		PRODUCTS: (state) => state.products,
		CATEGORIES: (state) => state.categories,
		MEASUARES: (state) => state.measuares,
		USER: (state) => state.user,
	},
	mutations: {
		SET_PRODUCT(state, payload) {
			let product = state.products.find((el) => el.id === payload.id)

			product.measure = payload.measure
			product.price = payload.price
			product.title = payload.title
			product.category = payload.category
		},
		SET_PRODUCTS(state, payload) {
			state.products = payload
			console.log('[SET_PRODUCTS]', payload)
		},
		SET_DISHES(state, payload) {
			state.dishes = payload.reverse()
		},
		SET_USER(state, payload) {
			state.user = payload
		},
		SET_MEASUARES(state, payload) {
			state.measuares = payload
		},
		SET_CATEGORIES(state, payload) {
			state.categories = payload
		},
		IS_LOADING(state, payload) {
			state.isLoading = payload
		},
	},
	actions: {
		async GET_PRODUCTS({ commit }) {
			try {
				commit('IS_LOADING', true)
				let { data } = await axios.get(baseURL + 'products')
				commit('SET_PRODUCTS', data)
				commit('IS_LOADING', false)
			} catch (error) {
				console.error('Ошибка в [GET_PRODUCTS]: ' + error.message)
			}
		},
		async REGISTER_USER({ commit }, { email, password }) {
			let user = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
			// let currentUser = firebase.auth().currentUser
			// console.log(currentUser)

			commit('SET_USER', user.operationType)
		},

		async LOGIN_USER({ commit }, { email, password }) {
			let user = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
			commit('SET_USER', user.user.uid)
			console.log(user.user.uid)
		},
		async SET_USER_SESSION({ commit }, payload) {
			commit('SET_USER', payload.uid)
			console.log(payload.uid)
		},
		async GET_MEASUARES({ commit }) {
			try {
				commit('IS_LOADING', true)
				let { data } = await axios.get(baseURL + 'measuares')
				commit('SET_MEASUARES', data)
				commit('IS_LOADING', false)
			} catch (error) {
				console.error('Ошибка в [GET_MEASUARES]: ' + error.message)
			}
		},
		async GET_CATEGORIES({ commit }) {
			try {
				commit('IS_LOADING', true)
				let { data } = await axios.get(baseURL + 'categories')
				commit('SET_CATEGORIES', data)
				commit('IS_LOADING', false)
			} catch (error) {
				console.error('Ошибка в [GET_CATEGORIES]: ' + error.message)
			}
		},
		async UPDATE_PRODUCT({ commit }, data) {
			try {
				commit('IS_LOADING', true)
				await axios.put(baseURL + 'products/' + data.id, data)
				commit('SET_PRODUCT', data)
				commit('IS_LOADING', false)
			} catch (error) {
				console.error('Ошибка в [GET_PRODUCTS]: ' + error.message)
			}
		},
		async GET_DISHES({ commit }) {
			try {
				commit('IS_LOADING', true)
				let { data } = await axios.get(baseURL + 'dishes')
				commit('SET_DISHES', data)
				commit('IS_LOADING', false)
			} catch (error) {
				console.error('Ошибка в [GET_DISHES]: ' + error.message)
			}
		},
		async ADD_PRODUCT({ commit }, product) {
			try {
				await axios.post(baseURL + 'products/', product)
				let data = await firebase
					.database()
					.ref('ingredients')
					.push(product)

				let id = data.key

				// let { data } = await axios.get(baseURL + 'products')
				commit('SET_PRODUCTS', { ...data, id })
			} catch (error) {
				console.error('Ошибка в [ADD_PRODUCT]: ' + error.message)
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
