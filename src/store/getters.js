export default {
	LOADING: (state) => state.loading,
	PRODUCTS: (state) => state.products,
	USER: (state) => state.user,
	CATEGORIES: (state) => state.categories,
	MEASURES: (state) => state.measures,
	DISHES: (state) => state.dishes,
	INGREDIENTS: (state) => state.ingredients,
	DISH_BY_ID(state) {
		return (id) => {
			return state.dishes.find((dish) => dish.id == id)
		}
	},
}
