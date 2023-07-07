<script setup>
import { RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Menu />
    <RouterView />
    <Footer/>
  </div>
</template>

<style></style>
