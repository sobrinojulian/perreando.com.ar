<script setup>
import { storeToRefs } from 'pinia'

import { useUserStore } from '../stores/user.js'
import { esAnonimo } from '../utils/userUtils.js'

import HomeAnonima from '../components/HomeAnonima.vue'
import HomeAutenticado from '../components/HomeAutenticado.vue'

const store = useUserStore()
const { user } = storeToRefs(store)
</script>

<template>
  <HomeAnonima v-if="esAnonimo(user)" />
  <HomeAutenticado v-else />
</template>
