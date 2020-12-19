<template>
	<div>
		<dish-image
			:title="title"
			:total="total"
			:image="image"
			:length="len"
			:type="type"
		/>

		<div class="add add_dish">
			<el-form @submit.native.prevent="send">
				<el-form-item>
					<el-input
						placeholder="Название блюда"
						autocomplete="off"
						class="grey mb-3"
						clearable
						:maxlength="max"
						v-model="title"
					>
					</el-input>
					<el-input
						placeholder="Ссылка на изображение"
						autocomplete="off"
						class="grey"
						clearable
						v-model="image"
					>
					</el-input>
				</el-form-item>
			</el-form>

			<el-input
				type="textarea"
				:rows="3"
				class="mb-3 grey"
				placeholder="Текст рецепта"
				v-model="recipe"
			>
			</el-input>

			<el-radio-group v-model="type" size="medium">
				<el-radio-button label="Первое"></el-radio-button>
				<el-radio-button label="Второе"></el-radio-button>
				<el-radio-button label="Десерт"></el-radio-button>
			</el-radio-group>
		</div>
		<div
			v-show="len"
			class="flex justify-content-space-between align-items-center mt-4 px-3"
		>
			<span class="subtitle">Список продуктов</span>

			<el-tag type="info" size="mini" effect="dark">{{ len }} </el-tag>
		</div>
		<div class="list">
			<el-card
				shadow="never"
				v-for="(item, idx) in INGREDIENTS"
				:key="item.id"
				class="mb-2 grey"
				:id="idx"
			>
				<div
					class="flex justify-content-space-between align-items-center"
					:id="item.id"
				>
					<div>
						<h6 class="mb-0 mr-2">{{ item.title }}</h6>
						<small class="text_grey"
							>{{ item.price }} &#8381; за {{ item.measure }}</small
						>
					</div>

					<div>
						<el-input-number
							size="mini"
							class="mt-1"
							:min="min"
							:step="item.step"
							:value="item.value"
							@change="cangeValue($event, item.id)"
						></el-input-number>

						<!-- <i
							class="el-icon-delete ml-3 mr-1 text-primary"
							@click="remove(item.id)"
						></i> -->
					</div>
				</div>
			</el-card>
		</div>
		<div class="button-area">
			<el-button
				class="button-wide"
				icon="el-icon-plus"
				@click="send"
				type="danger"
				round
				>Добавить</el-button
			>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from 'vuex'
	import dishImage from '@/components/Dishes/dish-image.vue'

	export default {
		name: 'newDishList',

		data() {
			return {
				title: 'Название блюда',
				image: null,
				recipe: null,
				min: 0,
				max: 60,
				type: null,
			}
		},
		components: {
			dishImage,
		},
		computed: {
			...mapGetters(['INGREDIENTS']),
			len() {
				return Object.keys(this.INGREDIENTS).length
			},
			total() {
				let res = 0

				this.INGREDIENTS.forEach((el) => {
					if (el.measure == 'гр') {
						res += (el.value / 1000) * el.price
					} else {
						res += el.value * el.price
					}
				})

				return parseInt(res)
			},
		},

		methods: {
			...mapMutations(['UPDATE_INGREDIENT_BY_ID', 'DELETE_INGREDIENT_BY_ID']),
			...mapActions(['ADD_DISH']),
			cangeValue(num, id) {
				this.UPDATE_INGREDIENT_BY_ID({ id, num })
			},
			send() {
				console.log('Отправляем')
				this.ADD_DISH({
					title: this.title,
					ingredients: this.INGREDIENTS,
					total: this.total,
					recipe: this.recipe,
					image: this.image,
					type: this.type,
				})
			},

			// remove(id) {
			// 	this.DELETE_INGREDIENT_BY_ID(id)
			// },
		},
	}
</script>

<style scoped>
	.add {
		padding: 20px 25px 0 25px;
	}
	.text_grey {
		color: #777;
	}

	.button-area {
		padding: 0 25px;
	}

	.el-radio-button--medium .el-radio-button__inner {
		width: 100%;
	}
</style>
