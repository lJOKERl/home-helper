<template>
	<div>
		<h4>Добавление продукта</h4>

		<form @submit.prevent="send">
			<div class="form-group">
				<input
					type="text"
					v-model.trim="$v.title.$model"
					class="form-control"
					autocomplete="off"
					:class="{ 'is-invalid': $v.title.$error }"
					placeholder="Наименование"
				/>
				<div class="invalid-feedback" v-if="!$v.title.required">
					Введите название
				</div>
				<div class="invalid-feedback" v-if="!$v.title.minLength">
					Введите более {{ $v.title.$params.minLength.min - 1 }}-х символов
				</div>
			</div>
			<div class="form-group">
				<input
					type="number"
					v-model.trim="$v.price.$model"
					class="form-control"
					autocomplete="off"
					:class="{ 'is-invalid': $v.price.$error }"
					placeholder="Стоимость"
				/>
				<div class="invalid-feedback" v-if="!$v.price.required">
					Введите цену
				</div>
				<div class="invalid-feedback" v-if="!$v.price.numeric">
					Только числа
				</div>
			</div>

			<div class="form-group">
				<select id="formCat" class="form-control" v-model="category">
					<option value="category" disabled>Выберите категорию:</option>
					<option v-for="category in CATEGORIES" :key="category.id">
						{{ category.title }}
					</option>
				</select>
			</div>

			<div class="d-flex justify-content-between align-items-center">
				<div class="btn-group " role="group" aria-label="Basic example">
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

				<b-button variant="success" pill type="submit"
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
	import { required, minLength, numeric } from 'vuelidate/lib/validators'

	export default {
		name: 'addProduct',
		data() {
			return {
				title: '',
				price: null,
				measure: 'шт',
				category: 'овощи',
				len: 4,
			}
		},
		validations: {
			title: {
				required,
				minLength: minLength(3),
			},
			price: {
				required,
				numeric,
			},
		},
		components: {
			productsList,
		},
		computed: {
			...mapGetters(['PRODUCTS', 'CATEGORIES', 'MEASURES']),
		},
		methods: {
			...mapActions(['ADD_PRODUCT', 'GET_PRODUCTS']),
			addMeasure(event) {
				this.measure = event.target.value
			},
			clearForm() {
				this.curentID = null
				this.title = null
				this.price = null
				this.measure = null
			},
			send() {
				if (!this.$v.title.$invalid) {
					this.ADD_PRODUCT({
						title: this.title,
						price: this.price,
						measure: this.measure,
						category: this.category,
					})
					this.clearForm()
					this.$v.$reset()
				}

				return
			},
		},
		watch: {
			price() {
				if (this.price < 0) {
					this.price = null
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
