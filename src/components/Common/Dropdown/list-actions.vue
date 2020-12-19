<template>
	<div>
		<el-dropdown @command="handleCommand" trigger="click">
			<span class="el-dropdown-link">
				<i class="el-icon-more"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :command="{ id, action: 'edit' }" icon="el-icon-edit"
					>Редактировать</el-dropdown-item
				>
				<el-dropdown-item
					:command="{ id, title, action: 'del' }"
					icon="el-icon-delete"
					>Удалить</el-dropdown-item
				>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		name: 'listActions',
		props: {
			id: {
				type: String,
			},
			title: {
				type: String,
			},
		},
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			handleCommand(command) {
				if (command.action == 'edit') {
					this.edit(command.id, command.title)
				} else if (command.action == 'del') {
					this.remove(command.id, command.title)
				}
			},
			edit(id) {
				this.$emit('editElem', id)
			},
			remove(id, title) {
				this.$emit('deleteElem', { id, title })
			},
		},
	}
</script>

<style lang="scss" scoped></style>
