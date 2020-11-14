import firebase from 'firebase/app'

export default {
	async GET_PRODUCTS({ commit }) {
		commit('IS_LOADING', true)
		try {
			let data = await firebase
				.database()
				.ref('products')
				.once('value')

			data = data.val()

			let products = []

			for (const key in data) {
				products.push({ ...data[key], id: key })
			}

			commit('SET_PRODUCTS', products)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [GET_PRODUCTS]: ' + error.message)
		}
	},
	async GET_CATEGORIES({ commit }) {
		commit('IS_LOADING', true)
		try {
			let data = await firebase
				.database()
				.ref('categories')
				.once('value')

			data = data.val()

			let categories = []

			for (const key in data) {
				categories.push({ ...data[key], id: key })
			}

			commit('SET_CATEGORIES', categories)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [GET_CATEGORIES]: ' + error.message)
		}
	},
	async GET_MEASURES({ commit }) {
		commit('IS_LOADING', true)
		try {
			let data = await firebase
				.database()
				.ref('measures')
				.once('value')

			data = data.val()

			let measures = []

			for (const key in data) {
				measures.push({ ...data[key], id: key })
			}

			commit('SET_MEASURES', measures)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [GET_MEASURES]: ' + error.message)
		}
	},
	async GET_DISHES({ commit }) {
		commit('IS_LOADING', true)
		try {
			let data = await firebase
				.database()
				.ref('dishes')
				.once('value')

			data = data.val()

			let dishes = []

			for (const key in data) {
				dishes.push({ ...data[key], id: key })
			}

			commit('SET_DISHES', dishes)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [GET_DISHES]: ' + error.message)
		}
	},
	async REGISTER_USER({ commit }, { email, password }) {
		let user = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)

		commit('SET_USER', user.operationType)
	},
	async LOGIN_USER({ commit }, { email, password }) {
		let user = await firebase.auth().signInWithEmailAndPassword(email, password)
		commit('SET_USER', user.user.uid)
	},
	async SET_USER_SESSION({ commit }, payload) {
		commit('SET_USER', payload.uid)
	},
	async UPDATE_PRODUCT({ commit }, payload) {
		try {
			commit('IS_LOADING', true)

			await firebase
				.database()
				.ref('products')
				.child(payload.id)
				.update({
					measure: payload.measure,
					price: payload.price,
					title: payload.title,
					category: payload.category,
					id: payload.id,
				})

			commit('PUT_PRODUCT', payload)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [GET_PRODUCTS]: ' + error.message)
		}
	},
	async UPDATE_CATEGORY({ commit }, payload) {
		try {
			commit('IS_LOADING', true)

			await firebase
				.database()
				.ref('categories')
				.child(payload.id)
				.update(payload)

			commit('PUT_CATEGORY', payload)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [UPDATE_CATEGORY]: ' + error.message)
		}
	},
	async UPDATE_MEASURE({ commit }, payload) {
		try {
			commit('IS_LOADING', true)

			await firebase
				.database()
				.ref('measures')
				.child(payload.id)
				.update(payload)

			commit('PUT_MEASURE', payload)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [UPDATE_MEASURE]: ' + error.message)
		}
	},
	async ADD_PRODUCT({ commit, state }, product) {
		try {
			let sameName = state.products.filter((el) => el.title === product.title)

			if (sameName.length > 0) {
				alert(product.title + ' уже в списке')
			} else {
				let data = await firebase
					.database()
					.ref('products')
					.push(product)

				let id = data.key

				commit('PUSH_PRODUCT', { ...product, id })
			}
		} catch (error) {
			console.error('Ошибка в [ADD_PRODUCT]: ' + error.message)
		}
	},
	async DELETE_PRODUCT({ commit }, id) {
		try {
			firebase
				.database()
				.ref('products')
				.child(id)
				.remove()

			commit('DELETE_PRODUCT_BY_ID', id)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [DELETE_PRODUCT]: ' + error.message)
		}
	},
	async DELETE_CATEGORY({ commit }, id) {
		try {
			firebase
				.database()
				.ref('categories')
				.child(id)
				.remove()

			commit('DELETE_CATEGORY_BY_ID', id)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [DELETE_CATEGORY]: ' + error.message)
		}
	},
	async DELETE_MEASURE({ commit }, id) {
		try {
			firebase
				.database()
				.ref('measures')
				.child(id)
				.remove()

			commit('DELETE_MEASURE_BY_ID', id)
			commit('IS_LOADING', false)
		} catch (error) {
			console.error('Ошибка в [DELETE_MEASURE]: ' + error.message)
		}
	},
	async ADD_CATEGORY({ commit }, category) {
		try {
			let data = await firebase
				.database()
				.ref('categories')
				.push(category)

			let id = data.key

			commit('PUSH_CATEGORY', { title: category.title, id })
		} catch (error) {
			console.error('Ошибка в [ADD_CATEGORY]: ' + error.message)
		}
	},
	async ADD_MEASURE({ commit }, measure) {
		try {
			let data = await firebase
				.database()
				.ref('measures')
				.push(measure)

			let id = data.key

			commit('PUSH_MEASURE', {
				id,
				title: measure.title,
				number: measure.number,
			})
		} catch (error) {
			console.error('Ошибка в [ADD_MEASURE]: ' + error.message)
		}
	},
	async ADD_DISH({ commit }, dish) {
		try {
			let data = await firebase
				.database()
				.ref('dishes')
				.push(dish)

			let id = data.key

			commit('PUSH_DISH', {
				id,
				...dish,
			})
		} catch (error) {
			console.error('Ошибка в [ADD_DISH]: ' + error.message)
		}
	},
}
