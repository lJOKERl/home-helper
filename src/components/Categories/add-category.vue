<template>
	<div>
		<div class="add">
			<el-form
				:model="validate"
				:rules="rules"
				ref="validate"
				@submit.prevent.native="send('validate')"
				status-icon
			>
				<el-form-item prop="title">
					<el-input
						placeholder="Название категории"
						v-model="validate.title"
						autocomplete="off"
						class="grey"
					>
					</el-input>
				</el-form-item>
				<el-button
					@click="send('validate')"
					type="primary"
					icon="el-icon-plus"
					class="button-wide"
					>Добавить</el-button
				>
			</el-form>
		</div>
		<div
			class="flex justify-content-space-between align-items-center white px-3"
		>
			<span class="subtitle">Список категорий</span>

			<el-tag type="info" v-show="CATEGORIES" size="mini" effect="dark"
				>{{ len }}
			</el-tag>
		</div>
		<categories-list />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import categoriesList from '@/components/Categories/categories-list.vue'

	export default {
		name: 'add-caterory',
		data() {
			return {
				curentID: null,
				validate: {
					title: null,
				},
				rules: {
					title: [
						{
							required: true,
							message: 'Введите название',
							trigger: 'blur',
						},
					],
				},
			}
		},

		components: {
			categoriesList,
		},
		computed: {
			...mapGetters(['LOADING', 'CATEGORIES']),
			len() {
				return Object.keys(this.CATEGORIES).length
			},
		},
		methods: {
			...mapActions(['ADD_CATEGORY']),
			send(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ADD_CATEGORY({
							id: this.curentID,
							title: this.validate.title.toLowerCase(),
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
	.add {
		padding: 20px 25px;
	}
</style>
