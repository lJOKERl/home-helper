<template>
	<div>
		<modal title="Редактирование" id="edit">
			<template v-slot:content
				><div class="form-group">
					<label for="formTitle">Наименование</label>
					<input
						type="text"
						ref="title"
						required
						id="formTitle"
						v-model.trim="$v.title.$model"
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
						v-for="item in MEASURES"
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
			</template>
			<template v-slot:footer>
				<div class="d-flex justify-content-end">
					<b-button
						pill
						type="submit"
						variant="outline-success "
						@click="send"
						:disabled="$v.title.$invalid"
						class="mr-1"
					>
						<b-icon icon="vector-pen" class="mr-1"></b-icon
						>Редактировать</b-button
					>
					<b-button
						variant="outline-secondary"
						pill
						@click="$bvModal.hide('edit')"
						><b-icon icon="x" class=""></b-icon>Отмена</b-button
					>
				</div>
			</template>
		</modal>
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
				<h5 class="text-center">{{ title }}</h5>

				<p class="text-center text-danger">
					Действительно хотите удалить продукт?
				</p>
			</template>
			<template v-slot:footer>
				<div class="d-flex justify-content-center">
					<b-button
						pill
						type="submit"
						variant="danger"
						@click="remove"
						class="mr-1"
					>
						<b-icon icon="trash-fill" class="mr-1"></b-icon>Удалить</b-button
					>
					<b-button
						variant="outline-secondary"
						pill
						@click="$bvModal.hide('delete')"
						><b-icon icon="x" class=""></b-icon>Отмена</b-button
					>
				</div>
			</template>
		</modal>

		<ul class="list-group my-3" v-if="LOADING">
			<li class="list-group-item" v-for="(item, index) in len" :key="index">
				<b-skeleton animation="wave" class="mt-1" width="100%"> </b-skeleton>
			</li>
		</ul>
		<empty-list v-else-if="!PRODUCTS.length">
			<b-icon icon="basket" font-scale="1.5" class="mr-2"> </b-icon>В списке нет
			продуктов. Самое время добавить!
		</empty-list>
		<ul v-else class="list-group my-3">
			<li
				v-for="product in PRODUCTS"
				:key="product.id"
				:id="product.id"
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
						@click="edit(product.id)"
					>
					</b-icon>

					<b-icon
						icon="trash"
						variant="danger"
						class="trash_icon ml-2"
						@click="showDeleteModal(product.id, product.title)"
					>
					</b-icon>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import emptyList from '@/components/Common/empty-list.vue'
	import modal from '@/components/Common/modal.vue'
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		name: 'productsList',
		data() {
			return {
				title: '',
				price: null,
				currentID: null,
				measure: 'шт',
				category: '',
				len: 4,
			}
		},
		components: {
			modal,
			emptyList,
		},
		validations: {
			title: {
				required,
				minLength: minLength(3),
			},
		},
		computed: {
			...mapGetters(['LOADING', 'PRODUCTS', 'CATEGORIES', 'MEASURES']),
		},
		methods: {
			...mapActions(['DELETE_PRODUCT', 'UPDATE_PRODUCT']),
			addMeasure(event) {
				this.measure = event.target.value
			},
			showDeleteModal(id, title) {
				this.$bvModal.show('delete')
				this.currentID = id
				this.title = title
			},
			remove() {
				this.DELETE_PRODUCT(this.currentID)
				this.$bvModal.hide('delete')
			},
			edit(id) {
				this.$bvModal.show('edit')
				let product = this.PRODUCTS.find((el) => el.id === id)

				this.title = product.title
				this.price = product.price
				this.measure = product.measure
				this.category = product.category
				this.currentID = id
			},
			send() {
				this.UPDATE_PRODUCT({
					title: this.title,
					price: this.price,
					measure: this.measure,
					category: this.category,
					id: this.currentID,
				})

				this.$bvModal.hide('edit')
			},
		},
	}
</script>

<style scoped>
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
