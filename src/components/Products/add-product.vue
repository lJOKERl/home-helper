<template>
	<div>
		<el-card :body-style="{ padding: '0' }" shadow="never">
			<div class="add">
				<el-form
					:model="validate"
					:rules="rules"
					ref="validate"
					@submit.prevent.native="send('validate')"
					class="mt-1"
				>
					<el-form-item prop="title">
						<el-input
							placeholder="Наименование"
							v-model="validate.title"
							autocomplete="off"
							class="grey"
						></el-input>
					</el-form-item>
					<el-form-item prop="value">
						<el-select
							v-model="validate.value"
							clearable
							class="grey"
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
					</el-form-item>

					<div class="flex justify-content-space-between mb-3" shadow="never">
						<div>
							<span class="label">Стоимость</span>
							<el-input-number
								size="small"
								v-model="validate.price"
								:min="0"
							></el-input-number>
						</div>

						<div>
							<span class="label">Ед.измерения</span>
							<el-radio-group size="small" v-model="validate.measure">
								<el-radio-button
									class="my-0"
									v-for="item in MEASURES"
									:key="item.id"
									:label="item.title"
								></el-radio-button>
							</el-radio-group>
						</div>
					</div>

					<el-button
						size="medium"
						icon="el-icon-check"
						@click="send('validate')"
						type="primary"
						class="button-wide"
						>Добавить</el-button
					>
				</el-form>
			</div>
			<div class="list">
				<div
					class="flex justify-content-space-between align-items-center mt-4 px-2"
				>
					<span class="subtitle">Список продуктов</span>

					<el-tag type="info" v-show="PRODUCTS" size="mini" effect="dark"
						>{{ len }}
					</el-tag>
				</div>
				<products-list />
			</div>
		</el-card>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import productsList from '@/components/Products/products-list.vue'

	export default {
		name: 'addProduct',
		data() {
			return {
				validate: {
					title: '',
					price: null,
					value: null,
					category: 'овощи',
				},

				rules: {
					title: [
						{
							required: true,
							message: 'Введите название',
							trigger: 'blur',
						},
						{
							min: 3,
							message: 'Название должно быть больше 3',
							trigger: 'blur',
						},
					],
					value: [
						{
							required: true,
							message: 'Выберите категорию',
							trigger: 'blur',
						},
					],
				},
				measure: 'шт',
				step: null,
			}
		},

		components: {
			productsList,
		},

		computed: {
			...mapGetters(['PRODUCTS', 'CATEGORIES', 'MEASURES']),
			len() {
				return Object.keys(this.PRODUCTS).length
			},
		},
		methods: {
			...mapActions(['ADD_PRODUCT', 'GET_PRODUCTS']),
			addMeasure(event) {
				this.measure = event.target.value
			},

			send(formName) {
				if (this.validate.measure == 'шт' || this.validate.measure == 'уп') {
					this.step = 1
				} else {
					this.step = 50
				}

				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ADD_PRODUCT({
							title: this.validate.title,
							price: parseInt(this.validate.price),
							step: this.step,
							value: this.validate.value,
							measure: this.validate.measure,
							category: this.validate.category,
						})

						this.$refs[formName].resetFields()
					} else {
						return
					}
				})
			},
		},
	}
</script>

<style scoped>
	.el-select {
		width: 100%;
	}

	.add {
		padding: 20px 25px 0 25px;
	}

	.label {
		font-size: 0.85rem;
		display: block;
		margin-bottom: 0.2rem;
	}
</style>
