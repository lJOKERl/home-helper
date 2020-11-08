<template>
	<b-modal :id="id" :title="title" hide-footer>
		<slot name="content" />
		<slot name="footer" />
	</b-modal>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: 'Заголовок',
			},
			id: {
				type: String,
				default: 'modal',
			},
		},
	}
</script>

<style lang="scss" scoped></style>
