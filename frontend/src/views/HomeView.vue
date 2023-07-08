<script setup>
import { useUserStore } from '../stores/user.js'

import HomeAnonima from '../components/HomeAnonima.vue'
import HomeAutenticado from '../components/HomeAutenticado.vue'

const userStore = useUserStore()
</script>

<template>
  <HomeAnonima v-if="userStore.esAnonimo()" />
  <HomeAutenticado v-else />
</template>
