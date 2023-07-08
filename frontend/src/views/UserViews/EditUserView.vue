<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import { useUserStore } from '@/stores/user.js'
import userService from '@/services/userService.js'

const userStore = useUserStore()
const user = storeToRefs(userStore).user

const router = useRouter()
const incrementoSaldo = ref(0)

const editar = () => {
  const updatedUser = {
    username: user.value.username,
    email: user.value.email,
    password: user.value.password,
    nombre: user.value.nombre,
    apellido: user.value.apellido,
    dni: user.value.dni,
    fechaNacimiento: user.value.fechaNacimiento,
    telefono: user.value.telefono,
    direccion: user.value.direccion,
    role: user.value.role,
    saldo: user.value.saldo + incrementoSaldo.value
  }

  userService
    .editUser(user.value.id, updatedUser)
    .then(response => {
      if (response.status === 200) {
        userStore.update(response)
        alert('Datos de usuario actualizado correctamente.')
        router.push('/user')
      } else {
        alert(response.data.error)
      }
    })
    .catch(error => {
      alert('Error: Valide los datos ingresados.')
      console.log(error)
    })
}
</script>
<template>
  <div class="container">
    <h2 class="mb-4">Editar información de usuario</h2>
    <hr />

    <form @submit.prevent="editar">
      <!-- Datos Personales de usuario -->
      <h5 class="mb-4">Datos Personales</h5>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          v-model="user.nombre"
          type="text"
          class="form-control"
          id="nombre"
          placeholder="Name" />
      </div>

      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input
          v-model="user.apellido"
          type="text"
          class="form-control"
          id="apellido"
          placeholder="Last Name" />
      </div>

      <div class="form-group">
        <label for="dni">DNI:</label>
        <input
          v-model="user.dni"
          type="number"
          class="form-control"
          id="dni"
          placeholder="DNI" />
      </div>

      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          v-model="user.fechaNacimiento"
          type="date"
          class="form-control"
          id="fechaNacimiento"
          placeholder="Date of Birth" />
      </div>

      <!-- Datos de Contacto de usuario -->
      <br />
      <h5 class="mb-4">Datos de Contacto</h5>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Email Address" />
      </div>

      <div class="form-group">
        <label for="telefono">Telefono:</label>
        <input
          v-model="user.telefono"
          type="number"
          class="form-control"
          id="telefono"
          placeholder="Phone Number" />
      </div>

      <!-- Datos de Direccion de usuario -->
      <br />
      <h5 class="mb-4">Ubicacion</h5>

      <div class="form-group">
        <label for="direccion">Direccion:</label>
        <input
          v-model="user.direccion"
          type="text"
          class="form-control"
          id="direccion"
          placeholder="Direccion" />
      </div>

      <!-- Asignar Saldo del usuario -->
      <br />
      <div class="form-group" v-if="userStore.esCliente()">
        <h5 class="mb-4">Saldo en cuenta del Cliente</h5>
        <input
          v-model="incrementoSaldo"
          type="number"
          class="form-control"
          id="saldo"
          placeholder="Saldo" />
        <small id="help" class="form-text text-muted"
          >Solo puede aumentar el importe.</small
        >
      </div>

      <br />
      <button type="submit" class="btn btn-primary me-2">Editar</button>
      <RouterLink to="/user">
        <button class="btn btn-primary me-2">Volver</button>
      </RouterLink>
    </form>
  </div>
</template>
