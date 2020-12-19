<template>
	<div>
		<div class="add">
			<el-form @submit.native.prevent="send">
				<el-form-item>
					<el-input
						placeholder="Искать..."
						prefix-icon="el-icon-search"
						autocomplete="off"
						clearable
						v-model="search"
						@input="searchElem"
					>
					</el-input>
				</el-form-item>
			</el-form>

			<div class="filter mb-2" v-show="products.length">
				<el-tag
					size="medium"
					type="info"
					effect="plain"
					@click="sortList($event, 'все')"
					id="все"
					:class="{ active: 'все' === activeItem }"
					class="mr-1 mb-1"
					>Все</el-tag
				>
				<el-tag
					type="info"
					size="medium"
					effect="plain"
					class="mr-1 mb-1"
					:id="cat.title"
					v-for="(cat, idx) in CATEGORIES"
					:key="cat.id"
					:class="{ active: idx === activeItem }"
					@click="sortList($event, idx)"
					>{{ cat.title }}</el-tag
				>
			</div>
		</div>

		<div class="list">
			<div
				v-show="products.length"
				class="flex justify-content-space-between align-items-center mb-2 px-2"
				:class="{ 'justify-content-center': !filtered.length }"
			>
				<span v-if="filtered.length" class="subtitle">Список продуктов</span>
				<span v-else class="subtitle">Нет продуктов</span>

				<el-tag v-if="filtered.length" type="danger" size="mini" effect="dark"
					>{{ filtered.length }}
				</el-tag>
			</div>

			<el-checkbox-group v-model="checkedProducts">
				<el-checkbox
					@change="addIngredient(product.id)"
					v-for="product in filtered"
					:key="product.id"
					:label="product.title"
					border
					>{{ product.title }}</el-checkbox
				>
			</el-checkbox-group>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from 'vuex'

	export default {
		props: {
			id: {
				type: String,
			},
		},
		data() {
			return {
				search: null,
				products: [],
				filtered: [],
				activeItem: 'все',
				checkedProducts: [],
			}
		},
		computed: {
			...mapGetters(['CATEGORIES', 'DISHES', 'INGREDIENTS']),
		},
		async created() {
			await this.GET_PRODUCTS()
			await this.$store.getters.PRODUCTS
			this.products = this.filtered = this.$store.getters.PRODUCTS
		},
		methods: {
			...mapMutations(['PUSH_INGREDIENT', 'DELETE_INGREDIENT_BY_ID']),
			...mapActions(['GET_PRODUCTS']),
			sortList(event, idx) {
				this.activeItem = idx

				if (event.target.id == 'все') {
					this.filtered = this.products
				} else {
					this.filtered = this.products.filter(
						(el) => el.category === event.target.id
					)
				}
			},
			searchElem() {
				this.filtered = this.products.filter(
					(el) => el.title.toLowerCase().indexOf(this.search) > -1
				)
			},
			addIngredient(id) {
				let res = this.products.filter((el) => el.id == id)

				let same = this.INGREDIENTS.find((el) => el.id === res[0].id)

				if (same) {
					this.DELETE_INGREDIENT_BY_ID(same.id)
				} else {
					this.PUSH_INGREDIENT({ ...res[0] })
					console.log(this.checkedProducts)
				}
			},
			uncheck(id) {
				console.log(id)
			},
		},
	}
</script>

<style scoped>
	.add {
		padding: 20px;
		padding-bottom: 30px;
		background: #f1f1f1;
	}

	.active {
		background: #f25c5d !important;
		color: #fff !important;
		border-color: #f25c5d !important;
	}

	.list {
		padding: 20px;
		border-radius: 1.5rem;
		margin-top: -1.5rem;
		background: #fff;
	}
	.el-checkbox.is-bordered {
		width: 100%;
		margin: 0 !important;
		margin-bottom: 0.5rem !important;
	}
	.el-checkbox.is-bordered + .el-checkbox.is-bordered {
		margin: 0 !important;
		margin-bottom: 0.5rem !important;
	}
</style>
