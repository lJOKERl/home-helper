<template>
	<div>
		<modal title="Удаление" id="delete">
			<template v-slot:content
				><div class="text-center d-flex  justify-content-center">
					<b-icon
						variant="danger"
						font-scale="2.5"
						class="mb-2"
						icon="exclamation-triangle"
					></b-icon>
				</div>
				<h5 class="text-center">ddd</h5>

				<p class="text-center text-danger">
					Действительно хотите удалить ед.измерения?
				</p>
			</template>
			<template v-slot:footer>
				<div class="d-flex justify-content-center">
					<b-button pill type="submit" variant="danger" class="mr-1">
						<b-icon icon="trash-fill" class="mr-1"></b-icon>Удалить</b-button
					>
					<b-button variant="outline-secondary" pill
						><b-icon icon="x" class=""></b-icon>Отмена</b-button
					>
				</div>
			</template>
		</modal>

		<div class="wrap" v-if="DISHES.length">
			<b-list-group
				v-for="dish in DISHES"
				:key="dish.id"
				@click="check($event)"
			>
				<b-list-group-item class="d-flex align-items-center">
					<b-avatar class="mr-3"></b-avatar>
					<span class="mr-auto">{{ dish.title }}</span>
					<b-badge>{{ dish.total }}</b-badge>
				</b-list-group-item>
			</b-list-group>
		</div>

		<empty-list v-else>
			<b-icon icon="emoji-neutral" font-scale="1.5" class="mr-2"> </b-icon>Нет
			блюд. Самое время добавить!
		</empty-list>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import emptyList from '@/components/Common/empty-list.vue'
	import modal from '@/components/Common/modal.vue'

	export default {
		name: 'listOfDishes',

		components: {
			modal,
			emptyList,
		},
		computed: {
			...mapGetters(['DISHES']),
		},
		methods: {
			check(event) {
				console.log('click')
				event.currentTarget.style.border = '1px solid red'
			},
		},
	}
</script>

<style scoped>
	.list-group {
		min-width: 49%;
		margin: 0.1rem;
		cursor: pointer;
	}

	.wrap {
		display: flex;
		flex-wrap: wrap;
	}
</style>
