<template>
	<div class="container">
		<div id="app">
			<div class="flex justify-content-space-between align-items-center header">
				<el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
				<i
					class="el-icon-s-fold"
					id="burger"
					style="cursor: pointer; font-size: 1.25rem"
				></i>
				<navbar />
			</div>
			<div class="nav">
				<el-page-header
					@back="$router.go(-1)"
					title=""
					:content="this.$route.meta.title"
				>
				</el-page-header>
			</div>

			<router-view></router-view>
		</div>

		<bottom-menu />
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap-vue/dist/bootstrap-vue.css'
	import { mapActions, mapGetters } from 'vuex'
	import navbar from '@/components/Common/navbar.vue'
	import bottomMenu from '@/components/Common/menu.vue'

	export default {
		name: 'App',
		components: { navbar, bottomMenu },

		methods: {
			...mapActions([
				'GET_PRODUCTS',
				'GET_DISHES',
				'GET_CATEGORIES',
				'GET_MEASURES',
			]),
			handleClose(done) {
				done()
			},
		},
		computed: {
			...mapGetters(['USER', 'LOADING']),
		},
		mounted() {
			this.GET_PRODUCTS()
			this.GET_CATEGORIES()
			this.GET_MEASURES()
			this.GET_DISHES()
		},
	}
</script>

<style>
	.nav {
		position: absolute;
		top: 0;
		padding: 12px;
	}
</style>
