<template>
	<div>
		<div
			v-if="!products.length"
			class="alert alert-light mt-3 text-center"
			role="alert"
		>
			<b-icon icon="bag-x" font-scale="1.5"> </b-icon> В списке нет продуктов.
			Вы можете их добавить.
		</div>

		<ul v-else class="list-group my-3">
			<li
				v-for="product in products"
				:class="{ done: product.completed }"
				:key="product.id"
				class="list-group-item d-flex justify-content-between align-items-center"
			>
				<div>
					<h6>{{ product.title }}</h6>
					<small class="badge badge-pill badge-light"
						>{{ product.measure }} | {{ product.category }}</small
					>
				</div>
				<div>
					{{ product.price }} &#8381;
					<b-icon
						icon="trash"
						variant="danger"
						class="trash_icon ml-2"
						@click="DELETE_PRODUCT(product.id)"
					>
					</b-icon>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex'
	export default {
		name: 'productsList',
		computed: {
			...mapState(['products']),
			...mapGetters(['GET_LOADING_STATUS']),
		},
		methods: {
			...mapActions(['DELETE_PRODUCT']),
		},
	}
</script>

<style>
	.delete_btn {
		cursor: pointer;
		color: darkred;
	}

	.trash_icon {
		cursor: pointer;
	}

	.badge {
		font-weight: normal;
	}
</style>
