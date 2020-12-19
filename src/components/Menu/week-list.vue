<template>
	<div class="list">
		<el-date-picker
			v-model="week"
			type="week"
			class="mb-3"
			format="dd.MM.yyyy"
			placeholder="Выберите неделю"
		>
		</el-date-picker>
		<!-- <el-date-picker v-model="day" type="date" placeholder="Pick a day">
		</el-date-picker> -->
		<el-timeline>
			<el-timeline-item timestamp="22.11.2020" placement="top">
				<div>
					<div class="dish_icon mb-1">
						<div class="dish_info">
							<el-avatar
								:size="50"
								fit="cover"
								class="mr-2"
								src="http://prigotovim.org/uploads/posts/2011-04/1303986975_krasnyjj-borshh.jpg"
							></el-avatar>
							<span>Борщ</span>
						</div>
						<div class="switcher">
							<el-switch v-model="switched"> </el-switch>
						</div>
					</div>
					<div class="dish_icon mb-1">
						<div class="dish_info">
							<el-avatar
								:size="50"
								fit="cover"
								class="mr-2"
								src="http://prigotovim.org/uploads/posts/2013-08/1377693535_top.jpg"
							></el-avatar>
							<span>Каша с мясной подливой</span>
						</div>
						<div class="switcher">
							<el-switch v-model="switched"> </el-switch>
						</div>
					</div>
				</div>
			</el-timeline-item>

			<el-timeline-item timestamp="22.11.2020" placement="top">
				<div>
					<div class="dish_icon mb-1">
						<div class="dish_info">
							<el-avatar
								:size="50"
								fit="cover"
								class="mr-2"
								src="http://prigotovim.org/uploads/posts/2013-09/1378814965_top.jpg"
							></el-avatar>
							<span>Уха из консервы</span>
						</div>
						<div class="switcher">
							<el-switch v-model="switched"> </el-switch>
						</div>
					</div>
					<div class="dish_icon mb-1">
						<div class="dish_info">
							<el-avatar
								:size="50"
								fit="cover"
								class="mr-2"
								src="http://prigotovim.org/uploads/posts/2014-05/1400572722_top.jpg"
							></el-avatar>
							<span>Блины с рыбой и рисом</span>
						</div>
						<div class="switcher">
							<el-switch v-model="switched"> </el-switch>
						</div>
					</div>
				</div>
			</el-timeline-item>

			<el-timeline-item timestamp="22.11.2020" placement="top">
				<div>
					<div class="dish_icon mb-1">
						<div class="dish_info">
							<el-avatar
								:size="50"
								fit="cover"
								class="mr-2"
								src="http://prigotovim.org/uploads/posts/2011-02/1297360522_top.jpg"
							></el-avatar>
							<span>Холодный свекольник</span>
						</div>
						<div class="switcher">
							<el-switch v-model="switched"> </el-switch>
						</div>
					</div>
					<div class="dish_icon mb-1">
						<div class="dish_info">
							<el-avatar
								:size="50"
								fit="cover"
								class="mr-2"
								src="http://prigotovim.org/uploads/posts/2012-02/1329920003_top1.jpg"
							></el-avatar>
							<span>Говядина с черносливом</span>
						</div>
						<div class="switcher">
							<el-switch v-model="switched"> </el-switch>
						</div>
					</div>
				</div>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<script>
	export default {
		name: 'weekList',
		data() {
			return {
				week: null,
				day: null,
				switched: false,
			}
		},
	}
</script>

<style scoped>
	.dish_icon {
		display: flex;
		justify-content: space-between;
	}

	.dish_icon + .dish_icon {
		border-top: 1px solid #eee;
		padding-top: 3px;
	}

	.dish_info {
		display: flex;
		align-items: center;
	}

	.switcher {
		display: inline-flex;
		align-items: center;
	}

	.price {
		font-size: 0.9rem;
	}

	.el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 100%;
	}
</style>
