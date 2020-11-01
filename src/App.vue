<template>
	<div class="container" id="app">
		<top-menu />
		<router-view></router-view>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap-vue/dist/bootstrap-vue.css'
	import topMenu from '@/components/top-menu.vue'
	import { mapActions } from 'vuex'

	export default {
		name: 'App',
		components: {
			topMenu,
		},
		methods: {
			...mapActions(['GET_PRODUCTS']),
		},
		mounted() {
			this.GET_PRODUCTS()
		},
	}
</script>

<style>
	body {
		background: #eee !important;
	}
</style>
