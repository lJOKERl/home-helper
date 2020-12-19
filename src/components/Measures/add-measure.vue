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

			<el-tag type="info" size="mini" effect="dark">{{ len }} </el-tag>
		</div>
		<measures-list />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import measuresList from '@/components/Measures/measures-list.vue'

	export default {
		name: 'addMeasure',
		data() {
			return {
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

				curentID: null,
				number: null,
			}
		},

		components: {
			measuresList,
		},
		computed: {
			...mapGetters(['MEASURES']),
			len() {
				return Object.keys(this.MEASURES).length
			},
		},
		methods: {
			...mapActions(['ADD_MEASURE']),

			send(formName) {
				if (this.validate.title == 'шт' || this.validate.title == 'уп') {
					this.number = 1
				} else {
					this.number = 50
				}

				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ADD_MEASURE({
							id: this.curentID,
							title: this.validate.title,
							number: this.number,
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
		background: #fff;
	}

	.white {
		background: #fff;
	}
</style>
