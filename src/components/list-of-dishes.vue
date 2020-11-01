<template>
	<div>
		<h3>Список блюд</h3>
		<loader v-if="GET_LOADING_STATUS" />
		<div
			v-else-if="!dishes.length"
			class="alert alert-light mt-3 text-center"
			role="alert"
		>
			<b-icon icon="basket" font-scale="1.5"> </b-icon> В списке нет продуктов.
			Вы можете их добавить.
		</div>

		<ul v-else class="list-group  my-3">
			<li
				v-for="dish in dishes"
				:key="dish.id"
				class="list-group-item d-flex justify-content-between align-items-center"
			>
				<div class="dish_left">
					<img :src="dish.image" alt="" class="dish_img" />
					<div>
						{{ dish.title }}<br />
						<small class="text-secondary">Стоимость: 800 руб</small>
					</div>
				</div>
				<div>
					{{ dish.price }}
					<b-icon
						icon="trash"
						variant="danger"
						class="trash_icon ml-2"
						@click="DELETE_DISH(dish.id)"
					>
					</b-icon>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	import loader from '@/components/loader.vue'
	export default {
		name: 'listOfDishes',
		methods: {
			...mapActions(['GET_DISHES', 'DELETE_DISH']),
		},
		computed: {
			...mapState(['dishes']),
			...mapGetters(['GET_LOADING_STATUS']),
		},
		components: {
			loader,
		},
		mounted() {
			this.GET_DISHES()
		},
	}
</script>

<style scoped>
	.dish_img {
		width: 5rem;
		display: inline-block;
		border-radius: 0.25rem;
		margin-right: 0.5rem;
	}

	.dish_left {
		display: flex;
		align-items: center;
	}
</style>
