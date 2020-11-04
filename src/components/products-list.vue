<template>
	<div>
		<b-modal id="modal" title="Редактировать" hide-footer>
			<form @submit.prevent="sendProduct">
				<div class="form-group">
					<label for="formTitle">Наименование</label>
					<input
						type="text"
						ref="title"
						required
						id="formTitle"
						v-model.trim="title"
						class="form-control"
						autocomplete="off"
						placeholder=""
					/>
				</div>
				<div class="form-group">
					<label for="formPrice">Стоимость</label>
					<input
						type="number"
						ref="price"
						required
						id="formPrice"
						v-model.trim="price"
						class="form-control"
						autocomplete="off"
						draggable=""
						placeholder=""
					/>
				</div>

				<div class="form-group">
					<label for="formCat">Категория</label>
					<select id="formCat" class="form-control" v-model="category">
						<option v-for="category in CATEGORIES" :key="category.id">
							{{ category.title }}
						</option>
					</select>
				</div>

				<div class="btn-group form-group" role="group">
					<button
						v-for="item in MEASUARES"
						:key="item.id"
						type="button"
						class="btn btn-outline-secondary"
						:class="{ active: measure == item.title }"
						:value="item.title"
						@click="addMeasure"
					>
						{{ item.title }}
					</button>
				</div>

				<div class="d-flex justify-content-end">
					<b-button
						pill
						type="submit"
						variant="outline-success "
						@click="sendProduct"
						class="mr-1"
					>
						<b-icon icon="vector-pen" class="mr-1"></b-icon
						>Редактировать</b-button
					>
					<b-button
						variant="outline-secondary"
						pill
						@click="$bvModal.hide('modal')"
						><b-icon icon="x" class=""></b-icon>Отмена</b-button
					>
				</div>
			</form>
		</b-modal>
		<!-- <div
			v-if="!PRODUCTS.length"
			class="alert alert-light mt-3 text-center"
			role="alert"
		>
			<b-icon icon="bag-x" font-scale="1.5"> </b-icon> В списке нет продуктов.
			Вы можете их добавить.
		</div> -->

		<ul class="list-group my-3">
			<li
				v-for="product in PRODUCTS"
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
						icon="vector-pen"
						v-b-modal.modal-1
						variant="info"
						class="trash_icon ml-2"
						@click="editProduct(product.id)"
					>
					</b-icon>

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
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'productsList',
		data() {
			return {
				title: '',
				price: null,
				currentID: null,
				measure: 'шт',
				category: '',
			}
		},
		computed: {
			...mapGetters(['LOADING', 'PRODUCTS', 'CATEGORIES', 'MEASUARES']),
		},
		methods: {
			...mapActions(['DELETE_PRODUCT', 'UPDATE_PRODUCT']),
			addMeasure(event) {
				this.measure = event.target.value
			},
			editProduct(id) {
				this.$bvModal.show('modal')
				let product = this.PRODUCTS.find((el) => el.id === id)

				this.title = product.title
				this.price = product.price
				this.measure = product.measure
				this.category = product.category
				this.currentID = id
			},
			sendProduct() {
				this.UPDATE_PRODUCT({
					title: this.title,
					price: this.price,
					measure: this.measure,
					category: this.category,
					id: this.currentID,
				})

				this.$bvModal.hide('modal')
			},
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
