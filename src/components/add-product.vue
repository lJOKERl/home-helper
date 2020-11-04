<template>
	<div>
		<h3>Добавление продукта</h3>

		<form @submit.prevent="">
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
					<option v-for="cat in CATEGORIES" :key="cat.id">
						{{ cat.title }}
					</option>
				</select>
			</div>

			<div class="d-flex justify-content-between align-items-center">
				<div class="btn-group " role="group" aria-label="Basic example">
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

				<b-button variant="success" pill @click="sentForm"
					><b-icon icon="plus" class=""></b-icon>Добавить</b-button
				>
			</div>
		</form>

		<products-list />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import productsList from '@/components/products-list.vue'

	export default {
		name: 'addProduct',
		data() {
			return {
				title: '',
				price: null,
				measure: 'шт',
				category: 'овощи',
			}
		},
		components: {
			productsList,
		},
		computed: {
			...mapGetters(['PRODUCTS', 'CATEGORIES', 'MEASUARES']),
		},
		methods: {
			...mapActions(['ADD_PRODUCT', 'GET_PRODUCTS']),
			addMeasure(event) {
				this.measure = event.target.value
			},
			async sentForm() {
				await this.ADD_PRODUCT({
					title: this.title,
					price: this.price,
					measure: this.measure,
					category: this.category,
				})

				this.title = ''
				this.price = ''
			},
		},
		watch: {
			price() {
				if (this.price < 0) {
					this.price = this.price * -1
				}
			},
		},
	}
</script>

<style lang="css" scoped>
	.btn-primary {
		color: #fff !important;
	}
</style>
