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
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'App',
		components: {
			topMenu,
		},
		methods: {
			...mapActions(['GET_PRODUCTS', 'GET_CATEGORIES', 'GET_MEASUARES']),
		},
		computed: {
			...mapGetters(['USER']),
		},
		mounted() {
			this.GET_PRODUCTS()
			this.GET_MEASUARES()
			this.GET_CATEGORIES()
			// console.log(this.USER)
			// if (!this.USER) {
			// 	this.$router.push('/login')
			// }
			// 			rules_version = '2';
			// service cloud.firestore {
			//   match /databases/{database}/documents {
			//     match /{document=**} {
			//       allow read, write;
			//     }
			//   }
			// }
		},
	}
</script>

<style>
	body {
		background: #eee !important;
	}
</style>
