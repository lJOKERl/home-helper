<template>
	<b-input-group size="sm" @click="$emit('get-value', total)">
		<b-input-group-prepend>
			<b-button
				size="sm"
				:disabled="total <= min ? true : false"
				@mousedown="dec"
				:variant="variant"
				><b-icon icon="dash"></b-icon
			></b-button>
		</b-input-group-prepend>

		<b-form-input
			type="number"
			v-model="total"
			@blur="moreThan"
			:step="step"
			:min="min"
			@change="$emit('get-value', total)"
			autocomplete="off"
		></b-form-input>

		<b-input-group-append>
			<b-button size="sm" :variant="variant" @click="inc">
				<b-icon icon="plus"></b-icon>
			</b-button>
		</b-input-group-append>
	</b-input-group>
</template>

<script>
	export default {
		name: 'inputNumber',
		data() {
			return {
				total: this.value,
			}
		},
		props: {
			value: {
				type: Number,
				default: 1,
			},
			min: {
				type: Number,
				default: 1,
			},
			step: {
				type: Number,
				default: 1,
			},
			variant: {
				type: String,
				default: 'outline-secondary',
			},
		},
		methods: {
			inc() {
				this.total = parseInt(this.total) + parseInt(this.step)
			},
			dec() {
				this.total = parseInt(this.total) - parseInt(this.step)

				if (this.total - parseInt(this.step) < parseInt(this.step)) {
					this.total = parseInt(this.step)
				}
			},
			moreThan() {
				return this.total < parseInt(this.step)
					? (this.total = parseInt(this.step))
					: this.total
			},
		},
	}
</script>

<style lang="scss" scoped></style>
