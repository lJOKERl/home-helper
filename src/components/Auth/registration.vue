<template>
	<form @submit.prevent="">
		<div class="form-group">
			<label for="formTitle">Логин</label>
			<input
				type="text"
				required
				id="formTitle"
				v-model.trim="email"
				class="form-control"
				autocomplete="off"
			/>
		</div>
		<div class="form-group">
			<label for="formPassword">Пароль</label>
			<input
				type="password"
				required
				id="formPassword"
				v-model.trim="password"
				class="form-control"
				autocomplete="off"
			/>
		</div>
		<div class="form-group d-flex justify-content-end">
			<b-button pill variant="primary" @click="submitForm"
				><b-icon icon="box-arrow-in-left" class="mr-1"></b-icon
				>Зарегистрироваться</b-button
			>
		</div>
	</form>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				email: '',
				password: '',
			}
		},
		methods: {
			...mapActions(['REGISTER_USER', 'LOGIN_USER']),
			submitForm() {
				let user = {
					email: this.email,
					password: this.password,
				}

				this.REGISTER_USER(user).then(() => {
					this.LOGIN_USER(user)
					this.$router.push('/')
				})
			},
		},
	}
</script>
