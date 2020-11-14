export default {
	PUSH_PRODUCT(state, payload) {
		state.products.push(payload)
	},
	PUSH_CATEGORY(state, payload) {
		state.categories.push(payload)
	},
	PUSH_MEASURE(state, payload) {
		state.measures.push(payload)
	},
	PUSH_DISH(state, payload) {
		state.dishes.push(payload)
	},
	PUT_PRODUCT(state, payload) {
		let product = state.products.find((el) => el.id === payload.id)

		product.id = payload.id
		product.title = payload.title
		product.category = payload.category
		product.price = payload.price
		product.measure = payload.measure
	},
	PUT_CATEGORY(state, payload) {
		let category = state.categories.find((el) => el.id === payload.id)

		category.id = payload.id
		category.title = payload.title
	},
	PUT_MEASURE(state, payload) {
		let mesuare = state.measures.find((el) => el.id === payload.id)

		mesuare.id = payload.id
		mesuare.title = payload.title
	},
	SET_PRODUCTS(state, payload) {
		state.products = payload
	},
	SET_DISHES(state, payload) {
		state.dishes = payload
	},
	DELETE_PRODUCT_BY_ID(state, id) {
		let newArr = state.products.filter((el) => el.id !== id)
		state.products = newArr
	},
	DELETE_CATEGORY_BY_ID(state, id) {
		let newArr = state.categories.filter((el) => el.id !== id)
		state.categories = newArr
	},
	DELETE_MEASURE_BY_ID(state, id) {
		let newArr = state.measures.filter((el) => el.id !== id)
		state.measures = newArr
	},
	SET_USER(state, payload) {
		state.user = payload
	},
	SET_MEASURES(state, payload) {
		state.measures = payload
	},
	SET_CATEGORIES(state, payload) {
		state.categories = payload
	},
	IS_LOADING(state, payload) {
		state.loading = payload
	},
}
