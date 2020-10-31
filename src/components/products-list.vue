<template>
	<div>
		<ul class="list-group  my-3">
			<li
				v-for="product in products"
				:class="{ done: product.completed }"
				:key="product.id"
				class="list-group-item d-flex justify-content-between align-items-center"
			>
				<span>{{ product.title }}</span>
				<span>
					{{ product.price }} &#8381;
					<b-icon
						icon="trash"
						variant="danger"
						class="trash_icon ml-2"
						@click="DELETE_PRODUCT(product.id)"
					>
					</b-icon>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'productsList',
		computed: {
			...mapState(['products']),
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
</style>
