<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'
const store = useUserStore()
</script>
<template>
  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <RouterLink to="/user" class="nav-link"> Información Usuario </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/paseosProgramados" class="nav-link">
        Paseos Programados
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/historialPaseos" class="nav-link">
        Historial de Paseos
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/mascotas" class="nav-link"> Mascotas </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/busquedaPaseadores" class="nav-link">
        Contratar Paseadores
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/" class="nav-link" @click="store.logout()"> Logout </RouterLink>
    </li>
  </ul>
</template>
