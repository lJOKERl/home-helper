<template>
	<div class="list">
		<el-card
			shadow="hover"
			class="mb-2 grey"
			v-for="item in catList"
			:key="item.id"
			:body-style="{ padding: '12px' }"
		>
			<div class="flex justify-content-space-between align-items-center">
				<span class="list_title">{{ item.title }}</span>

				<span>
					<list-actions
						:id="item.id"
						:title="item.title"
						@editElem="edit"
						@deleteElem="show"
					/>
				</span>
			</div>
		</el-card>
		<edit-modal
			:editModal="showEditModal"
			@showModal="showEditModal = $event"
			@editElem="send"
		>
			<el-input placeholder="Название категории" v-model="title"></el-input>
		</edit-modal>
		<delete-modal
			:title="title"
			:deleteModal="showDeleteModal"
			@showModal="showDeleteModal = $event"
			@deleteElem="remove"
		>
		</delete-modal>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import listActions from '@/components/Common/Dropdown/list-actions.vue'
	import editModal from '@/components/Common/Modals/edit-modal.vue'
	import deleteModal from '@/components/Common/Modals/delete-modal.vue'

	export default {
		name: 'categoriesList',
		data() {
			return {
				title: '',
				currentID: null,
				showEditModal: false,
				showDeleteModal: false,
			}
		},
		components: {
			listActions,
			editModal,
			deleteModal,
		},
		computed: {
			...mapGetters(['LOADING', 'CATEGORIES']),
			catList() {
				return Object.assign([], { ...this.CATEGORIES }).reverse()
			},
		},
		methods: {
			...mapActions(['DELETE_CATEGORY', 'UPDATE_CATEGORY']),
			edit(id) {
				this.showEditModal = true
				let category = this.CATEGORIES.find((el) => el.id === id)

				this.title = category.title
				this.currentID = id
			},
			show({ title, id }) {
				this.showDeleteModal = true
				this.title = title
				this.currentID = id
			},
			remove() {
				this.DELETE_CATEGORY(this.currentID)
				this.showDeleteModal = false
			},
			send() {
				this.UPDATE_CATEGORY({
					title: this.title,
					id: this.currentID,
				})
			},
		},
	}
</script>
