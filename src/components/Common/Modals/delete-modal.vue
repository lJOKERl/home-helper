<template>
	<div>
		<el-dialog
			:before-close="close"
			:visible.sync="deleteModal"
			class="delete-modal"
		>
			<span slot="title"
				><i :class="iconHeader" v-if="iconHeader"></i> {{ header }}</span
			>
			<div class="text-center ">
				<span class="text-primary">Действительно хотите удалить?</span>

				<p class="mt-1 font-size-big ">
					{{ title }}
				</p>
			</div>
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
							remove()
						}
					"
					>Удалить</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'deleteModal',
		props: {
			deleteModal: {
				type: Boolean,
				default: false,
			},
			iconHeader: {
				type: String,
				default: 'el-icon-delete',
			},
			header: {
				type: String,
				default: 'Удалить',
			},
			title: {
				type: String,
				default: 'Элемент',
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

			remove() {
				this.$emit('deleteElem')
			},
		},
	}
</script>

<style lang="scss" scoped></style>
