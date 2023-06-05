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
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <img src="/perrando-logo-horizontal-blanco.png" alt="Perreando Logo" height="24">
      </RouterLink>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/paseosProgramados" class="nav-link">
              Paseos Programados
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/historialPaseos" class="nav-link">
              Historial de Paseos
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/user" class="nav-link">
              Información Usuario
            </RouterLink>
          </li>
          <!-- Botones de Usuario (Cliente que contratan paseadores) -->
          <li class="nav-item">
            <RouterLink v-if="user.role === 'CLIENTE'" to="/mascotas" class="nav-link">
              Mascotas
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.role === 'CLIENTE'" to="/busquedaPaseadores" class="nav-link">
              Contratar Paseadores
            </RouterLink>
          </li>
          <!-- Botones de Usuario (Paseadores de mascotas) -->
          <li class="nav-item">
            <RouterLink v-if="user.role === 'PASEADOR'" to="/disponibilidadPaseador" class="nav-link">
              Alta de Disponibilidad Paseos
            </RouterLink>
          </li>
          <!-- Botones de login/registro -->
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/" class="nav-link" v-on:click="() => {
                user.username = ''
                user.role = ''
              }">
              Logout
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-show="user.username === ''" to="/login" class="nav-link">
              Login
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-show="user.username === ''" to="/registrar" class="nav-link">
              Registrar
            </RouterLink>
          </li>
        </ul>
      </div>

    </div>
    <a v-if="user.username !== ''" class="navbar-brand">{{ `${user.role}: ${user.apellido}, ${user.nombre} (${user.dni})` }}</a>
  </nav>
</template>