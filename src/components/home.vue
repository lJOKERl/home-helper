<script>
	import { Bar } from 'vue-chartjs'
	import { mapState } from 'vuex'

	export default {
		extends: Bar,
		data: () => ({
			chartdata: {
				labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
				datasets: [
					{
						label: '# of Votes',
						data: [12, 19, 9, 15, 10, 13],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
		}),
		computed: { ...mapState(['products']) },
		mounted() {
			this.renderChart(this.chartdata, this.options)
		},
	}
</script>

<style lang="scss" scoped></style>
