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

				<!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
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

			<div class="d-flex justify-content-between align-items-center">
				<div class="btn-group " role="group" aria-label="Basic example">
					<button
						type="button"
						class="btn btn-outline-secondary"
						value="шт"
						@click="addMeasure"
					>
						шт
					</button>
					<button
						type="button"
						class="btn btn-outline-secondary"
						value="кг"
						@click="addMeasure"
					>
						кг
					</button>
					<button
						type="button"
						class="btn btn-outline-secondary"
						value="уп"
						@click="addMeasure"
					>
						уп
					</button>
				</div>

				<button
					type="submit"
					class="btn btn-primary"
					@click="ADD_PRODUCT({ title, price, measure })"
				>
					<b-icon icon="plus"> </b-icon>
					Добавить
				</button>
			</div>
		</form>

		<products-list />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import productsList from '@/components/products-list.vue'

	export default {
		name: 'addProduct',
		data() {
			return {
				title: '',
				price: null,
				measure: 'шт',
			}
		},
		components: {
			productsList,
		},
		computed: {
			...mapState(['products']),
		},
		methods: {
			...mapActions(['ADD_PRODUCT', 'GET_PRODUCTS']),
			addMeasure(event) {
				this.measure = event.target.value
			},
			clearForm() {
				this.title = ''
				this.price = ''
				this.measure = ''
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
