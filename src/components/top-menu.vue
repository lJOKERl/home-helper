<template>
	<div>
		<ul class="nav nav-pills my-3">
			<template v-if="USER">
				<li class="nav-item">
					<router-link class="nav-link" to="/">
						Главная
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/add">Добавить блюдо</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/add-product"
						>Список продуктов</router-link
					>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/menu">Список блюд</router-link>
				</li>
			</template>
			<template v-else>
				<li class="nav-item">
					<router-link class="nav-link" to="/login">Войти</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/registration"
						>Регистрация</router-link
					>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['USER']),
		},
	}
</script>

<style scoped>
	.router-link-exact-active {
		background: #007bff;
		color: #fff;
	}
</style>
