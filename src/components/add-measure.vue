<template>
	<div>
		<h4>Добавить единицу измерения</h4>

		<form @submit.prevent="sendForm">
			<div class="input-group">
				<input
					type="text"
					required
					v-model.trim="$v.title.$model"
					class="form-control"
					autocomplete="off"
					:class="{ 'is-invalid': $v.title.$error }"
					placeholder="Новая единица измерения"
				/>
				<span class="input-group-btn">
					<b-button
						variant="success"
						:disabled="$v.title.$invalid"
						type="submit"
						><b-icon icon="hourglass-split"></b-icon
						><span class="show-icon ml-2">Добавить</span></b-button
					>
				</span>
				<div class="invalid-feedback" v-if="!$v.title.required">
					Введите название
				</div>
			</div>
		</form>
		<measures-list />
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import measuresList from '@/components/measures-list.vue'
	import { required } from 'vuelidate/lib/validators'
	export default {
		name: 'addMeasure',
		data() {
			return {
				title: null,
				curentID: null,
			}
		},
		validations: {
			title: {
				required,
			},
		},
		components: {
			measuresList,
		},
		methods: {
			clearForm() {
				this.curentID = null
				this.title = ''
			},
			...mapActions(['ADD_MEASURE']),
			sendForm() {
				if (!this.$v.title.$invalid) {
					this.ADD_MEASURE({
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
