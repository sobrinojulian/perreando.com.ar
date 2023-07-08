<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user.js'
import userService from '@/services/userService'

const userStore = useUserStore()
const user = storeToRefs(userStore).user
const router = useRouter()

const loguear = async () => {
  try {
    const response = await userService.loginUser(
      user.value.username,
      user.value.password
    )
    userStore.login(response)
    router.push('/')
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert(error.response.data.error)
    } else {
      alert(error.message)
    }
  }
}
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Iniciar sesión</h2>
    <hr />

    <form @submit.prevent="loguear">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required />
      </div>

      <br />
      <button type="submit" class="btn btn-primary">Ingresar</button>
    </form>
  </div>
</template>
