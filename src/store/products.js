import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const products = new Vuex.Store({
    state: {
      products: [],
      productsFiltered: [],
      categories: ["все", "овощи", "мясо", "фрукты"],
      category: "овощи",
    },
    strict: process.env.NODE_ENV !== 'production',
    mutations: {},
    getters: {}
  });

export default products;