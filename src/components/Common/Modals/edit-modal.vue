<template>
	<div>
		<el-dialog
			:before-close="close"
			:visible.sync="editModal"
			class="edit-modal"
		>
			<span slot="title"
				><i :class="iconHeader" v-if="iconHeader"></i> {{ header }}</span
			>
			<slot />
			<span slot="footer" class="dialog-footer">
				<el-button round size="medium" @click="close">Отменить</el-button>
				<el-button
					round
					size="medium"
					type="primary"
					@click="
						() => {
							close()
							edit()
						}
					"
					>Редакировать</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'editModal',
		props: {
			editModal: {
				type: Boolean,
				default: true,
			},
			iconHeader: {
				type: String,
				default: 'el-icon-edit',
			},
			header: {
				type: String,
				default: 'Редактировать',
			},
		},
		data() {
			return {
				showModal: null,
			}
		},

		methods: {
			close() {
				this.showModal = false
				this.$emit('showModal', this.showModal)
			},

			edit() {
				this.$emit('editElem')
			},
		},
	}
</script>

<style lang="scss" scoped></style>
