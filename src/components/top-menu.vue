<template>
	<div>
		<ul class="nav nav-pills my-3">
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
					>Добавить продукт</router-link
				>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" to="/menu">Список блюд</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	.router-link-exact-active {
		background: #007bff;
		color: #fff;
	}
</style>
