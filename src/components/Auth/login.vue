<template>
	<div class="col-md-6 center">
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
			<div class="form-group d-flex justify-content-between align-items-center">
				<router-link to="/registration">Регистрация</router-link>
				<b-button pill variant="primary" @click="submitForm"
					><b-icon icon="box-arrow-in-left" class="mr-1"></b-icon
					>Войти</b-button
				>
			</div>
		</form>
	</div>
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
			...mapActions(['LOGIN_USER']),
			submitForm() {
				this.LOGIN_USER({
					email: this.email,
					password: this.password,
				}).then(() => {
					this.$router.push('/')
				})
			},
		},
	}
</script>

<style scoped>
	.center {
		margin: auto;
	}
</style>
