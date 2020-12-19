<template>
	<div class="list">
		<el-card
			shadow="hover"
			class="mb-2 grey"
			v-for="item in measuresList"
			:key="item.id"
			:body-style="{ padding: '12px' }"
		>
			<div class="flex justify-content-space-between align-items-center">
				<el-avatar class="primary"> {{ item.title }} </el-avatar>

				<span>
					<list-actions
						:id="item.id"
						:title="item.title"
						@editElem="edit"
						@deleteElem="show($event)"
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
		name: 'measuresList',
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
			...mapGetters(['LOADING', 'MEASURES']),
			measuresList() {
				return Object.assign([], { ...this.MEASURES }).reverse()
			},
		},
		methods: {
			...mapActions(['DELETE_MEASURE', 'UPDATE_MEASURE']),
			edit(id) {
				this.showEditModal = true
				let measure = this.MEASURES.find((el) => el.id === id)

				this.title = measure.title
				this.currentID = id
			},
			show({ title, id }) {
				this.showDeleteModal = true
				this.title = title
				this.currentID = id
			},
			remove() {
				this.DELETE_MEASURE(this.currentID)
				this.showDeleteModal = false
			},
			send() {
				this.UPDATE_MEASURE({
					title: this.title,
					id: this.currentID,
				})
			},
		},
	}
</script>

<style scoped>
	.danger {
		background: red !important;
		font-size: 1.5em !important;
	}
</style>
