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
			...mapActions(['GET_PRODUCTS', 'GET_CATEGORIES', 'GET_MEASURES']),
		},
		computed: {
			...mapGetters(['USER']),
		},
		mounted() {
			this.GET_PRODUCTS()
			this.GET_CATEGORIES()
			this.GET_MEASURES()
		},
	}
</script>

<style>
	body {
		background: #eee !important;
	}
	.container {
		max-width: 768px !important;
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
