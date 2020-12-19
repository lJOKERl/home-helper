<template>
	<div class="image">
		<div class="overlay"></div>

		<el-tag v-if="type" class="type" type="danger" size="small" effect="dark">
			{{ type }}
		</el-tag>

		<div class="total">
			<span><i class="el-icon-money"></i> {{ total }} &#8381;</span>
		</div>
		<span class="lenght"
			><i class="el-icon-shopping-bag-2"></i> {{ length }}</span
		>

		<img v-if="image" :src="image" :type="type" :alt="title" />

		<div v-else class="no-image">
			<i class="el-icon-picture-outline"></i>
		</div>

		<span class="title">{{ title }}</span>
	</div>
</template>

<script>
	export default {
		name: 'newDishList',
		props: {
			title: {
				type: String,
				default: 'Название блюда',
			},
			image: {
				type: String,
				default: null,
			},
			type: {
				type: String,
				default: null,
			},
			length: {
				type: Number,
				default: 0,
			},
			total: {
				type: Number,
				default: 0,
			},
		},
	}
</script>

<style scoped>
	.image {
		position: relative;
		max-height: 190px;
		overflow: hidden;
	}
	.no-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		min-height: 190px;
		background: #f5f7fa;
		color: #909399;
		font-size: 3rem;
	}
	.title {
		font-size: 1.7rem;
		position: absolute;
		bottom: 3rem;
		left: 1rem;
		right: 1rem;
		font-weight: 600;
		opacity: 0.85;
		line-height: 1.15;
		color: #fff;
		text-shadow: 0 1px 5px #333;
		z-index: 2;
	}
	.total {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		font-size: 1.25rem;
		font-weight: bold;
		text-shadow: 0 1px 5px #333;
		z-index: 2;
		color: #ffd509;
	}

	.lenght {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		font-size: 1.25rem;
		text-shadow: 0 1px 5px #333;
		color: #fff;
		z-index: 2;
	}

	.type {
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 2;
		letter-spacing: 0.02rem;
		text-transform: uppercase;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background: rgba(0, 0, 0, 0.3);
	}
</style>
