<template>
	<el-menu id="navbar" mode="horizontal">
		<el-submenu index="3">
			<template slot="title"
				><i class="el-icon-document-copy"></i> Списки</template
			>
			<el-menu-item index="3-1"
				><router-link to="/list-of-dishes"
					><i class="el-icon-tableware"></i>Блюда</router-link
				></el-menu-item
			>
			<el-menu-item index="3-2"
				><router-link to="/products-list"
					><i class="el-icon-shopping-bag-2"></i>Продукты</router-link
				></el-menu-item
			>
			<el-menu-item index="3-3"
				><router-link to="/categories-list"
					><i class="el-icon-warning-outline"></i>Категории</router-link
				></el-menu-item
			>
			<el-menu-item index="3-4"
				><router-link to="/measures-list"
					><i class="el-icon-warning-outline"></i>Ед.измерения</router-link
				></el-menu-item
			>
			<el-menu-item index="3-4"
				><router-link to="/measures-list"
					><i class="el-icon-warning-outline"></i>Категории</router-link
				></el-menu-item
			>
		</el-submenu>

		<el-submenu index="4">
			<template slot="title"
				><i class="el-icon-circle-plus-outline"></i> Добавить</template
			>
			<el-menu-item index="4-1"
				><router-link to="/add-new-dish"
					><i class="el-icon-tableware"></i>Блюдо</router-link
				></el-menu-item
			>
			<el-menu-item index="4-2"
				><router-link to="/add-product"
					><i class="el-icon-shopping-bag-2"></i>Продукт</router-link
				></el-menu-item
			>
			<el-menu-item index="4-3"
				><router-link to="/add-category"
					><i class="el-icon-folder-add"></i>Категорию</router-link
				></el-menu-item
			>
			<el-menu-item index="4-4"
				><router-link to="/add-measure"
					><i class="el-icon-warning-outline"></i>Ед.Измерения</router-link
				></el-menu-item
			>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {}
</script>

<style scoped></style>
