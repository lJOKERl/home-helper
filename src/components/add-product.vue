<template>
    <div>
        <h3>Добавление продукта</h3>

        <form @submit.prevent="">
            <div class="form-group">
                <label for="formTitle">Наименование</label>
                <input type="text" 
                   ref="title" 
                   required 
                   id="formTitle"
                   v-model.trim="title" 
                   class="form-control" 
                   autocomplete="off"
                   placeholder="" />

                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="form-group">
                <label for="formPrice">Стоимость</label>
                <input type="number" 
                   ref="price" 
                   required 
                   id="formPrice"
                   v-model.trim="price" 
                   class="form-control" 
                   autocomplete="off"
                   draggable=""
                   placeholder="" />
            </div>
            
            <button type="submit" 
                    class="btn btn-primary" 
                    @click="ADD_PRODUCT({title, price})">
                    Добавить
            </button>
        </form>

        <products-list/>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import productsList from '@/components/products-list.vue';

export default {
    name: "addProduct",
    data() {
        return {
            title: "",
            price: null
        }
    },
    components: {
        productsList
    },
    computed: {
        ...mapState(['products'])
    }, 
    methods: {
        ...mapActions([
            'ADD_PRODUCT',
            'GET_PRODUCTS'
            ])
    },
    watch: {
        price() {
            if (this.price < 0) {
                this.price = this.price * -1
            }
        }
    },
    created() {
        this.GET_PRODUCTS()
    }
}
</script>

<style lang="css" scoped>


    
</style>