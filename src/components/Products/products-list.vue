<template>
	<div class="list">
		<el-card
			v-for="item in productsList"
			:key="item.id"
			class="mb-2 grey"
			shadow="never"
			:body-style="{ padding: '10px' }"
		>
			<div class="flex justify-content-space-between ">
				<div class="flex justify-content-space-between ">
					<el-avatar
						shape="square"
						:size="50"
						class="mr-2"
						src="https://agroshop87.ru/wa-data/public/shop/products/21/63/6321/images/4062/4062.270x0.jpg"
					></el-avatar>
					<div class="products_info">
						<span class="list_title">{{ item.title }}</span>

						<span class="category ">{{ item.category }}</span>

						<span class="price text-primary">{{ item.price }} &#8381;</span>
					</div>
				</div>

				<div class="right">
					<span>
						<list-actions
							:id="item.id"
							:title="item.title"
							@editElem="edit"
							@deleteElem="show($event)"
						/>
					</span>
					<span class="measure">{{ item.measure }}</span>
				</div>
			</div>
		</el-card>
		<edit-modal
			:editModal="showEditModal"
			@showModal="showEditModal = $event"
			@editElem="send"
		>
			<el-input
				size="medium"
				placeholder="Название продукта"
				v-model="title"
				class="mb-2"
			></el-input>

			<el-input-number
				class="mb-2"
				size="medium"
				v-model="price"
			></el-input-number>

			<el-select
				size="medium"
				v-model="value"
				class="mb-2"
				clearable
				placeholder="Категория"
			>
				<el-option
					v-for="category in CATEGORIES"
					:key="category.id"
					:label="category.title"
					:value="category.title"
					class="mb-1"
				>
				</el-option>
			</el-select>
			<div class="flex justify-content-center mt-2">
				<el-radio-group size="medium" v-model="measure" fill>
					<el-radio-button
						class="my-0"
						v-for="item in MEASURES"
						:key="item.id"
						:label="item.title"
						@click="addMeasure($event)"
					></el-radio-button>
				</el-radio-group>
			</div>
		</edit-modal>
		<delete-modal
			:deleteModal="showDeleteModal"
			@showModal="showDeleteModal = $event"
			@deleteElem="remove"
			:title="title"
		>
		</delete-modal>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import listActions from '@/components/Common/Dropdown/list-actions.vue'
	import editModal from '@/components/Common/Modals/edit-modal.vue'
	import deleteModal from '@/components/Common/Modals/delete-modal.vue'
	export default {
		name: 'productsList',
		data() {
			return {
				title: '',
				currentID: null,
				step: null,
				price: null,
				value: null,
				measure: 'шт',
				category: '',
				showEditModal: false,
				showDeleteModal: false,
			}
		},
		components: {
			listActions,
			editModal,
			deleteModal,
		},
		computed: {
			...mapGetters(['LOADING', 'PRODUCTS', 'CATEGORIES', 'MEASURES']),
			productsList() {
				return Object.assign([], { ...this.PRODUCTS }).reverse()
			},
		},
		methods: {
			...mapActions(['DELETE_PRODUCT', 'UPDATE_PRODUCT']),
			addMeasure(event) {
				this.measure = event.target.value
			},

			edit(id) {
				let product = this.PRODUCTS.find((el) => el.id === id)

				this.step = product.step
				this.value = product.category
				this.category = product.category
				this.title = product.title
				this.price = product.price
				this.measure = product.measure
				this.currentID = id

				this.showEditModal = true
			},
			show({ title, id }) {
				this.showDeleteModal = true
				this.title = title

				this.currentID = id
			},
			remove() {
				this.DELETE_PRODUCT(this.currentID)
				this.showDeleteModal = false
			},
			send() {
				this.UPDATE_PRODUCT({
					title: this.title,
					id: this.currentID,
					price: this.price,
					measure: this.measure,
					value: this.value,
					category: this.value,
				})
			},
		},
	}
</script>

<style scoped>
	.products_info {
		line-height: 1.2;
	}
	.products_info span {
		display: block;
	}
	.price {
		color: #777;
		font-size: 0.9rem;
	}
	.category {
		font-size: 0.75rem;
		color: #999;
	}
	.measure {
		background: rgb(242 92 93 / 0.75);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		min-width: 30px;
		border-radius: 0.25rem;
		padding: 0.1rem 0.35rem 0.25rem 0.35rem;
		line-height: 0.85;
		font-size: 0.8rem;
		color: #fff;
	}

	.right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}
</style>
