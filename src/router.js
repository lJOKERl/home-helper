import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/components/home.vue'
import addProduct from '@/components/add-product.vue'
import listOfDishes from '@/components/list-of-dishes.vue'
import addNewDish from '@/components/add-new-dish.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes: [
		{
			path: '/',
			component: home,
		},
		{
			path: '/add-product',
			component: addProduct,
		},
		{
			path: '/menu',
			component: listOfDishes,
		},
		{
			path: '/add',
			component: addNewDish,
		},
	],
})
