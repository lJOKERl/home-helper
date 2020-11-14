<template>
	<div>
		<modal title="Редактирование" id="edit">
			<template v-slot:content
				><div class="form-group">
					<label for="formTitle">Наименование</label>
					<input
						type="text"
						v-model.trim="$v.title.$model"
						class="form-control"
						autocomplete="off"
						:class="{ 'is-invalid': $v.title.$error }"
						placeholder=""
					/>
					<div class="invalid-feedback" v-if="!$v.title.required">
						Введите название
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<div class="d-flex justify-content-end">
					<b-button
						pill
						type="submit"
						variant="outline-success "
						@click="send"
						:disabled="$v.title.$invalid"
						class="mr-1"
					>
						<b-icon icon="vector-pen" class="mr-1"></b-icon
						>Редактировать</b-button
					>
					<b-button
						variant="outline-secondary"
						pill
						@click="$bvModal.hide('edit')"
						><b-icon icon="x" class=""></b-icon>Отмена</b-button
					>
				</div>
			</template>
		</modal>

		<modal title="Удаление" id="delete">
			<template v-slot:content
				><div class="text-center d-flex  justify-content-center">
					<b-icon
						variant="danger"
						font-scale="2.5"
						class="mb-2"
						icon="exclamation-triangle"
					></b-icon>
				</div>
				<h5 class="text-center">{{ title }}</h5>

				<p class="text-center text-danger">
					Действительно хотите удалить ед.измерения?
				</p>
			</template>
			<template v-slot:footer>
				<div class="d-flex justify-content-center">
					<b-button
						pill
						type="submit"
						variant="danger"
						@click="remove"
						class="mr-1"
					>
						<b-icon icon="trash-fill" class="mr-1"></b-icon>Удалить</b-button
					>
					<b-button
						variant="outline-secondary"
						pill
						@click="$bvModal.hide('delete')"
						><b-icon icon="x" class=""></b-icon>Отмена</b-button
					>
				</div>
			</template>
		</modal>

		<ul class="list-group my-3" v-if="LOADING">
			<li class="list-group-item" v-for="(item, index) in len" :key="index">
				<b-skeleton animation="wave" class="mt-1" width="100%"> </b-skeleton>
			</li>
		</ul>
		<empty-list v-else-if="!MEASURES.length">
			<b-icon icon="folder-x" font-scale="1.5" class="mr-2"> </b-icon>Нет единиц
			измерения. Самое время добавить!
		</empty-list>
		<ul v-else class="list-group my-3">
			<transition-group name="fade">
				<li
					v-for="measure in MEASURES"
					:key="measure.id"
					:id="measure.id"
					class="list-group-item d-flex justify-content-between align-items-center"
				>
					<div>
						<h6>{{ measure.title }}</h6>
					</div>
					<div>
						<b-icon
							icon="vector-pen"
							v-b-modal.modal-1
							variant="info"
							class="trash_icon ml-2"
							@click="edit(measure.id)"
						>
						</b-icon>

						<b-icon
							icon="trash"
							variant="danger"
							class="trash_icon ml-2"
							@click="showDeleteModal(measure.id, measure.title)"
						>
						</b-icon>
					</div>
				</li>
			</transition-group>
		</ul>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import emptyList from '@/components/Common/empty-list.vue'
	import modal from '@/components/Common/modal.vue'
	import { required } from 'vuelidate/lib/validators'

	export default {
		name: 'measuresList',
		data() {
			return {
				title: '',
				currentID: null,
				len: 4,
			}
		},
		validations: {
			title: {
				required,
			},
		},
		components: {
			modal,
			emptyList,
		},
		computed: {
			...mapGetters(['LOADING', 'MEASURES']),
		},
		methods: {
			...mapActions(['DELETE_MEASURE', 'UPDATE_MEASURE']),

			showDeleteModal(id, title) {
				this.$bvModal.show('delete')
				this.currentID = id
				this.title = title
			},
			remove() {
				this.DELETE_MEASURE(this.currentID)
				this.$bvModal.hide('delete')
			},
			edit(id) {
				this.$bvModal.show('edit')
				let measure = this.MEASURES.find((el) => el.id === id)

				this.title = measure.title
				this.currentID = id
			},
			send() {
				if (!this.$v.title.$invalid) {
					this.UPDATE_MEASURE({
						title: this.title,
						id: this.currentID,
					})

					this.$bvModal.hide('edit')
					this.$v.$reset()
				}

				return
			},
		},
	}
</script>

<style>
	.delete_btn {
		cursor: pointer;
		color: darkred;
	}

	.trash_icon {
		cursor: pointer;
	}

	.badge {
		font-weight: normal;
	}
</style>
