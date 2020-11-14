<template>
	<b-toast :id="id" :title="title" :message="message"> </b-toast>
</template>

<script>
	export default {
		name: 'Toast',
		props: {
			id: {
				type: String,
				default: 'example',
			},
			title: {
				type: String,
				default: 'example',
			},
			message: {
				type: String,
				default: 'example',
			},
		},
	}
</script>

<style lang="scss" scoped></style>
