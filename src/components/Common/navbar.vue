<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark" class="mb-5">
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<!-- <b-navbar-nav>
					<b-nav-item to="/add-product">Продукты</b-nav-item>
				</b-navbar-nav> -->

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<li class="nav-item">
						<router-link class="nav-link" to="/add-new-dish"
							>Добавить блюдо</router-link
						>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/list-of-dishes"
							>Список блюд</router-link
						>
					</li>
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template #button-content>
							<b-icon icon="plus-circle" class="mr-1"></b-icon>
							Добавить
						</template>
						<b-dropdown-item to="/add-product"
							><b-icon icon="bag-check" class="mr-2"></b-icon
							>Продукт</b-dropdown-item
						>
						<b-dropdown-item to="/add-category"
							><b-icon icon="folder-plus" class="mr-2"></b-icon
							>Категорию</b-dropdown-item
						>
						<b-dropdown-item to="/add-measure"
							><b-icon icon="info-square" class="mr-2"></b-icon
							>Ед.Измерения</b-dropdown-item
						>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped></style>
