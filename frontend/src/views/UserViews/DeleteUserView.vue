<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user.js'
import userService from '@/services/userService.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const eliminar = () => {
  userService
    .deleteUser(user.value.id)
    .then(response => {
      userStore.logout()
      alert('Usuario eliminado correctamente.')
      router.push('/login')
    })
    .catch(error => {
      alert('Error: No se pudo eliminar su usuario.')
      console.log(error)
    })
}
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Eliminar usuario</h2>
    <hr />

    <form @submit.prevent="eliminar()">
      <div class="form-group">
        <label for="username"
          >¿Está seguro que desea eliminar su usuario <b>{{ user.username }}</b
          >?</label
        >
      </div>

      <br />
      <button type="submit" class="btn btn-primary me-2">
        Si
      </button>
      <RouterLink to="/user">
        <button class="btn btn-primary me-2">No</button>
      </RouterLink>
    </form>
  </div>
</template>
