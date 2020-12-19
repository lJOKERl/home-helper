<template>
	<div>
		<el-dialog :before-close="close" :visible.sync="menuModal">
			<slot />
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'menuModal',
		props: {
			menuModal: {
				type: Boolean,
				default: true,
			},

			header: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				isShow: null,
			}
		},

		methods: {
			close() {
				this.isShow = false
				this.$emit('isShow', this.isShow)
			},
		},
	}
</script>

<style lang="scss" scoped></style>
