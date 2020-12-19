import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/components/home.vue'
import addProduct from '@/components/Products/add-product.vue'
import productsList from '@/components/Products/products-list.vue'
import categoriesList from '@/components/Categories/categories-list.vue'
import addCategory from '@/components/Categories/add-category.vue'
import listOfDishes from '@/components/Dishes/list-of-dishes.vue'
import dish from '@/components/Dishes/dish.vue'
import addNewDish from '@/components/Dishes/add-new-dish.vue'
import weekList from '@/components/Menu/week-list.vue'
import addMeasure from '@/components/Measures/add-measure.vue'
import measuresList from '@/components/Measures/measures-list.vue'
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
			meta: { title: '' },
		},
		{
			path: '/add-product',
			component: addProduct,
			meta: { title: 'Добавить продукт' },
		},
		{
			path: '/products-list',
			component: productsList,
			meta: { title: 'Список продуктов' },
		},
		{
			path: '/categories-list',
			component: categoriesList,
			meta: { title: 'Список категорий' },
		},
		{
			path: '/add-category',
			component: addCategory,
			meta: { title: 'Добавить категорию' },
		},
		{
			path: '/add-measure',
			component: addMeasure,
			meta: { title: 'Добавить ед.измерения' },
		},
		{
			path: '/week-list',
			component: weekList,
			meta: { title: 'Блюда на неделю' },
		},
		{
			path: '/add-new-dish',
			component: addNewDish,
			meta: { title: 'Добавить блюдо' },
		},
		{
			path: '/list-of-dishes',
			component: listOfDishes,
			meta: { title: 'Список блюд' },
		},
		{
			path: '/dish/:id',
			component: dish,
			props: true,
			meta: { title: 'Блюдо' },
		},
		{
			path: '/measures-list',
			component: measuresList,
			meta: { title: 'Список ед.измерений' },
		},

		{
			path: '/registration',
			component: registration,
			meta: { title: 'Регистрация' },
		},
		{
			path: '/login',
			component: login,
			meta: { title: 'Авторизация' },
		},
	],
})
