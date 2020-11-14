<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-6">
				<form @submit.prevent="sendForm">
					<div class="input-group mb-3">
						<input
							type="text"
							required
							v-model.trim="$v.title.$model"
							class="form-control"
							autocomplete="off"
							:class="{ 'is-invalid': $v.title.$error }"
							placeholder="Название блюда"
						/>

						<div class="invalid-feedback" v-if="!$v.title.required">
							Введите название
						</div>
					</div>
				</form>
				<div>
					<b-badge
						class="mx-1 badge"
						variant="light"
						:id="cat.title"
						v-for="cat in CATEGORIES"
						:key="cat.id"
						@click="sortList"
						>{{ cat.title }}</b-badge
					>
				</div>
				<b-list-group class="my-3">
					<b-list-group-item
						button
						v-for="product in filtered"
						:key="product.id"
						:id="product.id"
						class="list-group-item d-flex 
            justify-content-between align-items-center"
						@click="addIngredient"
					>
						<h6 class="mb-0">{{ product.title }}</h6>
						<small class="badge badge-pill badge-light">{{
							product.category
						}}</small>
					</b-list-group-item>
				</b-list-group>
			</div>
			<div class="col-md-6">
				<h3 v-if="title">{{ title }}</h3>
				<h4 v-else>Название блюда</h4>

				<b-list-group v-if="dish.length">
					<b-list-group-item
						class="d-flex justify-content-between"
						button
						v-for="(item, idx) in dish"
						:key="item.id"
						:id="idx"
						><span>
							{{ item.title }}
							<span>{{ item.measure }}</span>
							<span> - {{ item.price }} руб</span>

							<input-number
								:min="item.step"
								:value="item.step"
								:step="item.step"
								v-on:get-value="updateArray(Number($event), item.id)"
							/>
						</span>

						<b-icon
							icon="trash"
							variant="danger"
							class="trash_icon ml-2"
							@click="remove(idx)"
						>
						</b-icon>
					</b-list-group-item>
				</b-list-group>

				<emptyList v-else
					><b-icon font-scale="1.5" icon="inbox" class="mr-2"> </b-icon>Здесь
					пусто!</emptyList
				>

				<div v-if="dish.length">
					<h5 class="mt-3">Итого: {{ total }} руб</h5>
					<b-button variant="success" @click="send" pill type="submit"
						><b-icon icon="plus"></b-icon>Сохранить</b-button
					>
				</div>
			</div>
		</div>
		<modal title="Сохранение" id="save">
			<template v-slot:content
				><div class="text-center d-flex  justify-content-center">
					<b-icon
						variant="success"
						font-scale="2.5"
						class="mb-2"
						icon="check-circle"
					></b-icon>
				</div>

				<h5 class="text-center ">{{ title }}</h5>

				<p class="text-center text-success">Блюдо успешно добавлено!</p>
			</template>
			<template v-slot:footer>
				<div class="d-flex justify-content-center">
					<b-button pill variant="success" @click="close" class="mr-1">
						<b-icon icon="check" class="mr-1"></b-icon>Ок</b-button
					>
				</div>
			</template>
		</modal>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	import modal from '@/components/Common/modal'
	import emptyList from '@/components/Common/empty-list'
	import inputNumber from '@/components/Common/Inputs/input-number'

	export default {
		name: 'listOfDishes',

		data() {
			return {
				title: null,
				message: '',
				filtered: this.PRODUCTS,
				dish: [],
			}
		},

		computed: {
			...mapGetters(['PRODUCTS', 'CATEGORIES', 'DISHES']),
			total() {
				let res = 0

				this.dish.forEach((el) => {
					if (el.measure == 'гр') {
						res += (el.value / 1000) * el.price
					} else {
						res += el.value * el.price
					}
				})

				return parseInt(res)
			},
		},

		components: {
			inputNumber,
			modal,
			emptyList,
		},

		validations: {
			title: {
				required,
			},
		},
		methods: {
			...mapActions(['ADD_DISH']),
			sortList(event) {
				this.filtered = this.PRODUCTS.filter(
					(el) => el.category === event.target.id
				)
			},
			send() {
				this.ADD_DISH({
					title: this.title,
					total: this.total,
					ingredients: this.dish,
				})
					.then(() => this.$bvModal.show('save'))
					.then(() => {
						this.dish = []

						this.$v.$reset()
					})

				this.title = null
			},
			toast(toaster, message, append = false) {
				this.$bvToast.toast(message, {
					title: 'Уведомление',
					solid: true,
					toaster: toaster,
					variant: 'danger',
					appendToast: append,
				})
			},
			addIngredient(event) {
				let res = this.PRODUCTS.filter((el) => el.id == event.currentTarget.id)

				let same = this.dish.find((el) => el.id === res[0].id)

				if (!same) {
					this.dish.push({ ...res[0] })
				} else {
					const el = this.$createElement

					// Create the message
					const vNodesMsg = el('p', {}, [
						el('strong', same.title),
						' уже в списке!',
					])

					this.toast('b-toaster-top-right', [vNodesMsg], true)
				}
			},
			updateArray(data, id) {
				if (this.dish.length > 0) {
					let ingredient = this.dish.find((el) => el.id === id)
					ingredient.value = data
				}
			},
			remove(idx) {
				this.dish.splice(idx, 1)
			},
			close() {
				this.$bvModal.hide('save')
			},
		},
	}
</script>

<style scoped>
	.badge {
		cursor: pointer;
	}

	.badge:hover {
		background: #ddd;
	}
</style>
