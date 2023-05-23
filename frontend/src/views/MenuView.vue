<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'
const store = useUserStore();
const { user } = storeToRefs(store);
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="mb-4">Paseos de mascotas</h1>
  <hr>

  <RouterLink to="/" class="btn btn-primary mr-2">
    Página Principal
  </RouterLink>

  <RouterLink v-if="user.username !== ''" to="/user" class="btn btn-primary mr-2">
    Información Usuario
  </RouterLink>

  <!-- <RouterLink v-if="user.username !== ''" to="/editUser" class="btn btn-primary mr-2">
    Editar Información Usuario
  </RouterLink> -->

  <RouterLink v-if="user.username !== ''" to="/paseosProgramados" class="btn btn-primary mr-2">
    Paseos Programados
  </RouterLink>

  <RouterLink v-if="user.username !== ''" to="/historialPaseos" class="btn btn-primary mr-2">
    Historial de Paseos
  </RouterLink>

  <!-- Botones de Usuario (Cliente que contratan paseadores) -->
  <RouterLink v-if="user.role === 'CLIENTE'" to="/mascotas" class="btn btn-primary mr-2">
    Mascotas
  </RouterLink>

  <RouterLink v-if="user.role === 'CLIENTE'" to="/busquedaPaseadores" class="btn btn-primary mr-2">
    Buscar Paseadores
  </RouterLink>

  <RouterLink v-if="user.role === 'CLIENTE'" to="/contratarPaseadores" class="btn btn-primary mr-2">
    Contratar Paseadores
  </RouterLink>

  <!-- Botones de Usuario (Paseadores de mascotas) -->
  <RouterLink v-if="user.role === 'PASEADOR'" to="/horariosPaseador" class="btn btn-primary mr-2">
    Horario
  </RouterLink>

  <RouterLink v-if="user.role === 'PASEADOR'" to="/zonasPaseador" class="btn btn-primary mr-2">
    Zonas
  </RouterLink>

  <!-- Botones de login/registro -->
  <RouterLink v-if="user.username !== ''" to="/" class="btn btn-primary" v-on:click="() => {user.username = ''
                                                                                            user.role = ''}">
    Logout
  </RouterLink>

  <RouterLink v-show="user.username === ''" to="/login" class="btn btn-primary mr-2">
    Login
  </RouterLink>

  <RouterLink v-show="user.username === ''" to="/registrar" class="btn btn-primary">
    Registrar
  </RouterLink>

  <hr>

  <h2 v-if="user.username !== ''" class="mt-4">{{ `Nombre: ${user.nombre}, ${user.apellido} - DNI: ${user.dni}` }}</h2>
  <hr>
</template>

<style></style>


<style></style>