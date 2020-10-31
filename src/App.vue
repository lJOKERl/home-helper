<template>
  <div class="container" id="app">
    <top-menu />
    <router-view></router-view>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import topMenu from '@/components/top-menu.vue';

export default {
  name: 'App',
  components: {
    topMenu
  }
}
</script>

<style>
  body {
    background: #eee!important;
  }
</style>
