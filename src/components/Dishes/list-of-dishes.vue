<template>
	<div class="list ">
		<el-input
			size="medium"
			placeholder="Искать..."
			v-model="search"
			class="mb-2"
			prefix-icon="el-icon-search"
		>
		</el-input>
		<div v-if="DISHES.length">
			<el-card
				v-for="dish in dishList"
				:key="dish.id"
				:body-style="{ padding: '8px' }"
				class="dish mb-2 grey"
				shadow="never"
			>
				<div class="dish_body">
					<router-link tag="div" class="left" :to="'dish/' + dish.id">
						<el-avatar
							:size="55"
							shape="square"
							class="ava"
							:src="
								dish.image
									? dish.image
									: 'https://viajandoecorrendo.com/_assets/img/no-img.jpg'
							"
						></el-avatar>
						<span class="dish_info">
							<span class="title">{{ dish.title }}</span>
							<span class="kind">первое</span>
							<span class="v-badge">{{ dish.total }}&#8381;</span>
						</span>
					</router-link>

					<div class="right">
						<span>
							<list-actions
								:id="dish.id"
								:title="dish.title"
								@editElem="edit"
								@deleteElem="show($event)"
							/>
						</span>
					</div>
				</div>
			</el-card>
		</div>

		<empty-list v-else>
			Нет блюд. Самое время добавить!
		</empty-list>
		<edit-modal
			@showModal="editModal = $event"
			:editModal="editModal"
			:iconHeader="'el-icon-edit'"
			header="Редактировать"
			:title="title"
			:total="total"
			:id="currentID"
		>
			<el-input
				clearable
				v-model="title"
				size="medium"
				class="my-1"
				placeholder="Введите название"
			>
			</el-input>
			<el-input
				clearable
				size="medium"
				class="my-1"
				v-model.number="total"
				placeholder="Введите цену"
			>
			</el-input>
			<el-input
				clearable
				size="medium"
				class="my-1"
				placeholder="Введите категорию"
			>
			</el-input>
		</edit-modal>
		<delete-modal
			:deleteModal="showDeleteModal"
			@showModal="showDeleteModal = $event"
			@deleteElem="remove"
			:title="title"
		>
		</delete-modal>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import listActions from '@/components/Common/Dropdown/list-actions.vue'
	import editModal from '@/components/Common/Modals/edit-modal.vue'
	import deleteModal from '@/components/Common/Modals/delete-modal.vue'
	import emptyList from '@/components/Common/empty-list.vue'

	export default {
		name: 'listOfDishes',
		data() {
			return {
				editModal: false,
				search: null,
				title: null,
				total: null,
				currentID: null,
				showEditModal: false,
				showDeleteModal: false,
			}
		},
		components: {
			emptyList,
			listActions,
			editModal,
			deleteModal,
		},
		computed: {
			...mapGetters(['DISHES']),
			dishList() {
				return Object.assign([], { ...this.DISHES }).reverse()
			},
		},

		methods: {
			...mapActions(['DELETE_DISH', 'UPDATE_DISH']),
			show({ title, id }) {
				this.showDeleteModal = true
				this.title = title

				this.currentID = id
			},
			remove() {
				this.DELETE_DISH(this.currentID)
				this.showDeleteModal = false
			},
			edit(id) {
				let dish = this.DISHES.find((el) => el.id === id)

				console.log(dish)

				this.title = dish.title
				this.total = dish.total
				this.currentID = id

				this.editModal = true
			},

			send(value) {
				this.UPDATE_DISH({
					title: value,
					id: this.currentID,
				})
			},
		},
	}
</script>

<style lang="sass" scoped>

	.dish
		&_list
			width: 100%

		&_menu
			position: relative
			top: -.5rem

		&_info
			display: flex
			flex-direction: column
			text-align: left

		.ava
			margin-right: .5rem
			flex-shrink: 0

		.left
			display: flex
			width: 92%

		.right
			display: flex
			flex-direction: column

		.title
			font-size: .9rem;
			font-weight: 500;
			line-height: 1;

		.kind
			font-size: .7rem
			color: #777

		&_body
			display: flex
			justify-content: space-between


	.wrap
		display: flex
		flex-wrap: wrap

	.search
		display: flex
		align-items: center

		.option
			color: #898989
			font-size: 1.5rem
</style>
