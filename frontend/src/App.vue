<script setup>
import { RouterView } from 'vue-router';
import MenuView from "./views/MenuView.vue";
import PieView from "./views/PieView.vue";
</script>

<template>
  <MenuView></MenuView>
  <RouterView />
  <PieView></PieView>
</template>

<style></style>
