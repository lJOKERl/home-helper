import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/components/home.vue'
import addProduct from '@/components/add-product.vue'
import addCategory from '@/components/Categories/add-category.vue'
import listOfDishes from '@/components/list-of-dishes.vue'
import addNewDish from '@/components/Dishes/add-new-dish.vue'
import addMeasure from '@/components/add-measure.vue'
import registration from '@/components/Auth/registration.vue'
import login from '@/components/Auth/login.vue'

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
			path: '/add-category',
			component: addCategory,
		},
		{
			path: '/add-measure',
			component: addMeasure,
		},
		{
			path: '/add-new-dish',
			component: addNewDish,
		},
		{
			path: '/list-of-dishes',
			component: listOfDishes,
		},
		{
			path: '/registration',
			component: registration,
		},
		{
			path: '/login',
			component: login,
		},
	],
})
