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
    <h1>Paseos de mascotas</h1><hr>
    <RouterLink to="/">
        <button>Pagina Principal</button>
    </RouterLink>
    <RouterLink v-if="user.username != ''" to="/user">
        <button>Informacion Usuario</button>
    </RouterLink>
    <RouterLink v-if="user.username != ''" to="/paseosProgramados">
        <button>Paseos Programados</button>
    </RouterLink>
    <RouterLink v-if="user.username != ''" to="/historialPaseos">
        <button>Historial de Paseos</button>
    </RouterLink>

    <!-- Botones de Usuario (Cliente que contratan paseadores) -->
    <RouterLink v-if="user.role == 'CLIENTE'" to="/mascotas">
        <button>Mascotas</button>
    </RouterLink>
    <RouterLink v-if="user.role == 'CLIENTE'" to="/busquedaPaseadores">
        <button>Buscar Paseadores</button>
    </RouterLink>
    <RouterLink v-if="user.role == 'CLIENTE'" to="/contratarPaseadores">
        <button>Contratar Paseadores</button>
    </RouterLink>

    <!-- Botones de Usuario (Paseadores de mascotas) -->
    <RouterLink v-if="user.role == 'PASEADOR'" to="/horariosPaseador">
        <button>Horario</button>
    </RouterLink>
    <RouterLink v-if="user.role == 'PASEADOR'" to="/zonasPaseador">
        <button>Zonas</button>
    </RouterLink>

    <!-- Botones de login/registro -->
    <RouterLink v-if="user.username != ''" to="/">
        <button v-on:click="user.username=''">Logout</button>
    </RouterLink>
    <RouterLink v-show="user.username == ''" to="/login">
        <button>Login</button>
    </RouterLink>
    <RouterLink v-show="user.username == ''" to="/registrar">
        <button>Registrar</button>
    </RouterLink>


    <h2 v-if="user.username != ''">{{ `Nombre: ${user.nombre}, ${user.apellido} - DNI: ${user.dni}` }}</h2>
    <hr>
</template>

<style></style>