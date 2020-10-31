<template>
  <div class="mt-5"> <div class="custom-control custom-checkbox mb-3">
    <input type="checkbox" class="custom-control-input" id="customControlValidation1" required>
    <label class="custom-control-label" for="customControlValidation1">Check this custom checkbox</label>
    <div class="invalid-feedback">Example invalid feedback text</div>
  </div>
    <div class="mb-3">
      <b-button-group>
        <b-button 
          variant="outline-primary" 
          v-for="(cat, idx) in categories" 
          :key="idx"
          :id="cat"
          @click="cangeCategory"
          >
        <b-icon icon="folder2"></b-icon> {{cat}}
    </b-button>
      </b-button-group>
    </div>
    
    <form @keypress.enter.prevent="addItem">
      <div class="form-group row">
        <div class="col-md-5">
          <input type="text" 
                 ref="name" 
                 required 
                 v-model.trim="name" 
                 class="form-control" 
                 autocomplete="off"
                 placeholder="Наименование продукта" >
        </div>
        <div class="col-md-7 row">
          <div class="col-md-4">
            <input type="number"
                autocomplete="off"
                ref="price" 
                required 
                v-model.number="price" 
                class="form-control" 
                placeholder="Цена" 
            />
          </div>

          <div class="col-md-4">
            <select class="form-control" v-model="category">
              <option v-for="(cat, idx) in categories" :key="idx">
                {{cat}}
              </option>
            </select>
          </div>

          <div class="col-md-4">
            <button type="button" @click="addItem" class="btn btn-success"><b-icon icon="plus"></b-icon>Добавить</button>
          </div>
        </div>
      </div>
    </form>
    <b-list-group v-if="show">
      <b-list-group-item v-for="(product, idx) in products" 
          :key="idx"
          :id="idx"
          class="d-flex justify-content-between align-items-center">
          {{product.name}} - {{product.price}} - <span class="badge badge-light">{{product.category}}</span>

          <span>
            <b-icon icon="pencil-fill" class="mr-2" variant="info"></b-icon>
            <b-icon 
              icon="trash-fill" 
              variant="danger"
              @click="deleteItem(idx)"
              ></b-icon>
          </span>

      </b-list-group-item>
    </b-list-group>

    <div class="alert alert-light" v-show="show" role="alert">
      Ничего не найдено
    </div>

    <b-list-group>
      <b-list-group-item v-for="(product, idx) in productsFiltered" 
          :key="idx" 
          :id="idx"
          class="d-flex justify-content-between align-items-center">
          {{product.name}} - {{product.price}} - <span class="badge badge-light">{{product.category}}</span>

          <span>
            <b-icon icon="pencil-fill" class="mr-2" variant="info"></b-icon>
            <b-icon 
              icon="trash-fill" 
              variant="danger"
              @click="deleteItem(idx)"
              ></b-icon>
          </span>

      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'addProduct',
  // methods: {
  //   addItem() {
  //     // Если ввели отрицательное число
  //     if (this.price < 0) {
  //       this.price *= -1
  //     }

  //     // Проверка на null и прочее
  //     if (!this.price) {
  //       this.price = 0
  //     }

  //     // Отправка данных из формы
  //     this.products.push({
  //       name: this.name,
  //       price: this.price,
  //       category: this.category
  //     })

  //     // Очищаем форму
  //     this.name = ""
  //     this.price = null
  //     this.total = null

  //     // Устанавливаем курсор в первое поле формы
  //     this.$refs.name.focus()
  //   },
  //   cangeCategory(event) {
  //     let cat = event.target.id
  //     console.log(cat);

  //     this.productsFiltered = this.products.filter(el => el.category == cat)

  //     if (this.productsFiltered) {
  //       this.show = false
  //     } 

  //     if (this.products) {
  //       this.show = false
  //     }

  //     if (cat == "все") {
  //       this.show = true
  //     }

  //     console.log(this.show);
  //   },
  //   deleteItem(idx) {
  //     this.products.splice(idx, 1)
  //   }
  // }
}
</script>


