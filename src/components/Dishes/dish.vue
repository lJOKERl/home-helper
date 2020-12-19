<template>
	<div class="mt-2">
		<dish-image
			:type="dish.type"
			:title="dish.title"
			:total="dish.total"
			:image="dish.image"
			:length="dish.ingredients.length"
		/>

		<div class="ingredients mt-2">
			<span class="sub_title">Ингредиенты</span>

			<div class=" mt-2" v-for="(item, idx) in dish.ingredients" :key="item.id">
				<el-divider v-if="idx"></el-divider>

				<div class="flex justify-content-space-between">
					<span>{{ item.title }}</span>
					<span>{{ item.value }} {{ item.measure }}</span>
				</div>
			</div>
		</div>

		<div class="list">
			<el-collapse v-if="dish.recipe" style="font-size: 17px;">
				<el-collapse-item name="1">
					<template slot="title">
						Рецепт
					</template>
					<div class="recipe">{{ dish.recipe }}</div>
				</el-collapse-item>
			</el-collapse>
			<el-card shadow="never" v-else class="mt-1">
				<span class="sub_title">Рецепт</span><br />
				<p>
					Все мелко нарезать, пожарить чутка можно че-нить. Сварить мясца если
					есть, а если нет, то можно и воды сварить.
				</p>
				<p>
					Все в эту воду захуярить и мальца поварить. Когда надоетс ждать - все.
					Борщ готов.
				</p>
				<p>Охуенный борщец. Отвечаю.</p></el-card
			>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import dishImage from '@/components/Dishes/dish-image.vue'
	export default {
		props: ['id'],
		computed: {
			...mapGetters(['DISH_BY_ID']),
			dish() {
				return this.DISH_BY_ID(this.id)
			},
		},
		components: {
			dishImage,
		},
	}
</script>

<style lang="sass" scoped>

	.el-divider--horizontal
		margin: 8px 0

	.title
		margin-bottom: 0
		font-weight: 500
		font-size: 1rem

	.sub_title
		margin-bottom: 0
		font-weight: 500
		font-size: 18px;
		color: #f56c6c;

	.list
		font-size: .8rem

	.recipe
		font-family: inherit
		white-space: pre-line
		font-size: 16px
		line-height: 1.4;

	.ingredients
		padding: 8px 8px 15px 8px
		border-bottom-left-radius: 1.5rem
		border-bottom-right-radius: 1.5rem
</style>
