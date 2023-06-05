<script setup>
import { RouterView } from 'vue-router';
import Menu from './components/Menu.vue';
import PieView from "./views/PieView.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Menu />
    <RouterView />
    <PieView></PieView>
  </div>
</template>

<style></style>
