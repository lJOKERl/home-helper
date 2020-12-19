<template>
	<div>
		<div class="menu">
			<div @click="add = true" class="menu_item ">
				<i class="el-icon-circle-plus-outline"></i><span>Добавить</span>
			</div>
			<div @click="list = true" class="menu_item">
				<i class="el-icon-document-copy"></i><span>Списки</span>
			</div>

			<router-link tag="div" class="menu_item" to="/week-list"
				><i class="el-icon-dish"></i
				><span class="custom">Меню</span></router-link
			>

			<div class="menu_item">
				<i class="el-icon-goods"></i><span>Покупки</span>
			</div>
		</div>
		<menuModal @isShow="add = $event" :menuModal="add" header="">
			<ul class="menu_list">
				<li @click="add = false">
					<router-link to="/add-new-dish"
						><i class="el-icon-tableware"></i>Добавить блюдо</router-link
					>
				</li>
				<li @click="add = false">
					<router-link to="/add-product"
						><i class="el-icon-shopping-bag-2"></i>Добавить продукт</router-link
					>
				</li>
				<li @click="add = false">
					<router-link to="/add-category"
						><i class="el-icon-folder-add"></i>Добавить категорию</router-link
					>
				</li>
				<li @click="add = false">
					<router-link to="/add-measure"
						><i class="el-icon-warning-outline"></i>Добавить
						ед.измерения</router-link
					>
				</li>
			</ul>
		</menuModal>

		<menuModal @isShow="list = $event" :menuModal="list" header="">
			<ul class="menu_list">
				<li @click="list = false">
					<router-link to="/list-of-dishes"
						><i class="el-icon-tableware"></i>Список блюд</router-link
					>
				</li>
				<li @click="list = false">
					<router-link to="/products-list"
						><i class="el-icon-shopping-bag-2"></i>Список продуктов</router-link
					>
				</li>
				<li @click="list = false">
					<router-link to="/categories-list"
						><i class="el-icon-folder-add"></i>Список категорий</router-link
					>
				</li>
				<li @click="list = false">
					<router-link to="/measures-list"
						><i class="el-icon-warning-outline"></i>Список
						ед.измерения</router-link
					>
				</li>
			</ul>
		</menuModal>
	</div>
</template>

<script>
	import menuModal from '@/components/Common/Modals/menuModal.vue'
	export default {
		name: 'bottomMenu',
		data() {
			return {
				add: false,
				list: false,
			}
		},

		components: {
			menuModal,
		},
	}
</script>

<style scoped>
	.menu {
		display: none;
	}

	.menu_list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.menu_list li {
		padding: 0.5rem 0;
		font-size: 1rem;
	}

	.menu_list li a {
		display: flex;
		align-items: center;
	}

	.menu_list li i {
		margin-right: 0.7rem;
		font-size: 1.7rem;
		color: #f25c5d;
		margin-bottom: -0.05rem;
	}

	@media (max-width: 600px) {
		.menu {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 999;
			color: #898989;
			font-size: 1.5rem;
			width: 100%;
			background: #fff;
			padding: 0.5rem 1rem;
			box-shadow: 0 0 0.25rem #ccc;
		}

		.menu_item {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 25%;
		}

		.menu_item.active {
			color: #f25c5d;
		}

		.menu span {
			font-size: 0.8rem;
		}

		.custom {
			font-size: 0.8rem;
		}
	}
</style>
