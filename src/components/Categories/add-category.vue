<template>
	<div>
		<h5>Добавление категории</h5>

		<form @submit.prevent="send">
			<div class="input-group">
				<input
					type="text"
					v-model.trim="$v.title.$model"
					class="form-control"
					autocomplete="off"
					:class="{ 'is-invalid': $v.title.$error }"
					placeholder="Название категории"
				/>

				<span class="input-group-btn">
					<b-button
						variant="success"
						:disabled="$v.title.$invalid"
						type="submit"
						><b-icon icon="folder-plus"></b-icon
						><span class="show-icon ml-2">Добавить</span></b-button
					>
				</span>
				<div class="invalid-feedback" v-if="!$v.title.required">
					Введите название
				</div>
				<div class="invalid-feedback" v-if="!$v.title.minLength">
					Введите более {{ $v.title.$params.minLength.min - 1 }}-х символов
				</div>
			</div>
		</form>
		<categories-list />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import categoriesList from '@/components/Categories/categories-list.vue'
	import { required, minLength } from 'vuelidate/lib/validators'

	export default {
		name: 'add-caterory',
		data() {
			return {
				title: null,
				curentID: null,
			}
		},
		validations: {
			title: {
				required,
				minLength: minLength(3),
			},
		},
		components: {
			categoriesList,
		},
		computed: {
			...mapGetters(['LOADING']),
		},
		methods: {
			clearForm() {
				this.curentID = null
				this.title = ''
			},
			...mapActions(['ADD_CATEGORY']),
			send() {
				if (!this.$v.title.$invalid) {
					this.ADD_CATEGORY({
						id: this.curentID,
						title: this.title,
					})
					this.clearForm()
					this.$v.$reset()
				}

				return
			},
		},
	}
</script>

<style scoped></style>
