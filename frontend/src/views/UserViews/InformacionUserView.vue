<script setup>
import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/user.js'

const storeUser = useUserStore()
const user = storeUser.user
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Informacion de usuario</h2>
    <hr />

    <form>
      <h5 class="mb-4">
        El rol del usuario <b>{{ user.username }}</b> es:
        <b>{{ user.role }}</b>
      </h5>

      <!-- Datos Personales de usuario -->
      <h5 class="mb-4">Datos Personales</h5>

      <div class="form-group">
        <label for="nombre"
          >Nombre: <b>{{ user.nombre }}</b></label
        >
      </div>
      <div class="form-group">
        <label for="apellido"
          >Apellido: <b>{{ user.apellido }}</b></label
        >
      </div>
      <div class="form-group">
        <label for="dni"
          >DNI: <b>{{ user.dni }}</b></label
        >
      </div>
      <div class="form-group">
        <label for="fechaNacimiento"
          >Fecha de Nacimiento: <b>{{ user.fechaNacimiento }}</b></label
        >
      </div>

      <!-- Datos de Contacto de usuario -->
      <br />
      <h5 class="mb-4">Datos de Contacto</h5>

      <div class="form-group">
        <label for="email"
          >Email: <b>{{ user.email }}</b></label
        >
      </div>
      <div class="form-group">
        <label for="telefono"
          >Telefono: <b>{{ user.telefono }}</b></label
        >
      </div>

      <!-- Datos de Direccion de usuario -->
      <br />
      <h5 class="mb-4">Ubicacion</h5>

      <div class="form-group">
        <label for="direccion"
          >Direccion: <b>{{ user.direccion }}</b></label
        >
      </div>

      <!-- Datos de Saldo de usuario -->
      <br />
      <h5 class="mb-4">
        Saldo: $<b>{{ user.saldo }}</b>
      </h5>
    </form>

    <br />
    <RouterLink to="/editUser">
      <button class="btn btn-primary me-2">Editar</button>
    </RouterLink>
    <RouterLink to="/deleteUser">
      <button class="btn btn-danger me-2">Eliminar</button>
    </RouterLink>
  </div>
</template>
