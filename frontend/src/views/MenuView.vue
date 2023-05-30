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
      <a class="navbar-brand">Paseos de mascotas</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <RouterLink to="/" class="nav-link" href="#">
              Página Principal
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/paseosProgramados" class="nav-link" href="#">
              Paseos Programados
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/historialPaseos" class="nav-link" href="#">
              Historial de Paseos
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/user" class="nav-link" href="#">
              Información Usuario
            </RouterLink>
          </li>
          <!-- Botones de Usuario (Cliente que contratan paseadores) -->
          <li class="nav-item">
            <RouterLink v-if="user.role === 'CLIENTE'" to="/mascotas" class="nav-link" href="#">
              Mascotas
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.role === 'CLIENTE'" to="/busquedaPaseadores" class="nav-link" href="#">
              Contratar Paseadores
            </RouterLink>
          </li>
          <!-- Botones de Usuario (Paseadores de mascotas) -->
          <li class="nav-item">
            <RouterLink v-if="user.role === 'PASEADOR'" to="/horariosPaseador" class="nav-link" href="#">
              Horarios
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="user.role === 'PASEADOR'" to="/zonasPaseador" class="nav-link" href="#">
              Zonas
            </RouterLink>
          </li>
          <!-- Botones de login/registro -->
          <li class="nav-item">
            <RouterLink v-if="user.username !== ''" to="/" class="nav-link" href="#" v-on:click="() => {
                user.username = ''
                user.role = ''
              }">
              Logout
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-show="user.username === ''" to="/login" class="nav-link" href="#">
              Login
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-show="user.username === ''" to="/registrar" class="nav-link" href="#">
              Registrar
            </RouterLink>
          </li>
        </ul>
      </div>

    </div>
    <a v-if="user.username !== ''" class="navbar-brand">{{ `${user.apellido}, ${user.nombre} (${user.dni})` }}</a>
  </nav><br>

  <!-- 
  <h1 class="mb-4">Paseos de mascotas</h1>
  <hr>

  <RouterLink to="/" class="btn btn-primary mr-2">
    Página Principal
  </RouterLink>

  <RouterLink v-if="user.username !== ''" to="/user" class="btn btn-primary mr-2">
    Información Usuario
  </RouterLink>

  <RouterLink v-if="user.username !== ''" to="/paseosProgramados" class="btn btn-primary mr-2">
    Paseos Programados
  </RouterLink>

  <RouterLink v-if="user.username !== ''" to="/historialPaseos" class="btn btn-primary mr-2">
    Historial de Paseos
  </RouterLink>

  <RouterLink v-if="user.role === 'CLIENTE'" to="/mascotas" class="btn btn-primary mr-2">
    Mascotas
  </RouterLink>

  <RouterLink v-if="user.role === 'CLIENTE'" to="/busquedaPaseadores" class="btn btn-primary mr-2">
    Buscar Paseadores
  </RouterLink>

  <RouterLink v-if="user.role === 'CLIENTE'" to="/contratarPaseadores" class="btn btn-primary mr-2">
    Contratar Paseadores
  </RouterLink>

  <RouterLink v-if="user.role === 'PASEADOR'" to="/horariosPaseador" class="btn btn-primary mr-2">
    Horario
  </RouterLink>

  <RouterLink v-if="user.role === 'PASEADOR'" to="/zonasPaseador" class="btn btn-primary mr-2">
    Zonas
  </RouterLink>

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
-->
</template>

<style></style>


<style></style>