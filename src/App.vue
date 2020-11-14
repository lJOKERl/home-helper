<template>
	<div>
		<navbar />
		<div class="container" id="app">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap-vue/dist/bootstrap-vue.css'
	import navbar from '@/components/Common/navbar.vue'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'App',
		components: {
			// topMenu,
			navbar,
		},
		methods: {
			...mapActions([
				'GET_PRODUCTS',
				'GET_DISHES',
				'GET_CATEGORIES',
				'GET_MEASURES',
			]),
		},
		computed: {
			...mapGetters(['USER']),
		},
		async mounted() {
			await this.GET_PRODUCTS()
			await this.GET_CATEGORIES()
			await this.GET_MEASURES()
			await this.GET_DISHES()
		},
	}
</script>

<style>
	body {
		background: #eee !important;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	.container {
		max-width: 800px !important;
	}
	/* input {
		background: #555 !important;
	}
	li {
		background: #555 !important;
	} */
	@media (max-width: 600px) {
		.show-icon {
			display: none;
		}
	}
</style>
