<template>
	<div>
		<carousel :items="1" :nav="false" :dots="false">
			<dish-ingredients />
			<new-dish-list />
		</carousel>
	</div>
</template>

<script>
	import carousel from 'vue-owl-carousel'
	import newDishList from '@/components/Dishes/new-dish-list.vue'
	import dishIngredients from '@/components/Dishes/dish-ingredients.vue'

	export default {
		components: {
			carousel,
			dishIngredients,
			newDishList,
		},
	}
</script>

<style scoped>
	.owl-carousel .owl-item {
		border: 2px solid blue !important;
		min-height: 100vh !important;
	}
</style>
