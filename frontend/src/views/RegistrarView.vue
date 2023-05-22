<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import userService from '../services/userService.js'

export default {
  setup() {
    const storeUser = useUserStore()
    const { user } = storeToRefs(storeUser)
    return {
      user
    }
  },
  data() {
    return {
      vue: this,
      user: {
        username: "",
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        dni: "",
        role: ""
      }
    };
  },
  methods: {
    registrar: (user, vue) => {
      userService.register(user)
        .then(response => {
          vue.user.username = response.data.username
          vue.user.email = response.data.email
          vue.user.password = response.data.password
          vue.user.nombre = response.data.nombre
          vue.user.apellido = response.data.apellido
          vue.user.dni = response.data.dni
          vue.user.role = response.data.role
          alert('Usuario registrado correctamente.')
          vue.$router.push("/");
        })
        .catch(error => {
          alert("Error: Valide los datos ingresados.");
          console.log(error);
        });
    }
  }
}
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Registro de usuario</h2>

    <form @submit.prevent="registrar(user, vue)">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Username">
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" class="form-control" id="email" placeholder="Email address">
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input v-model="user.nombre" type="text" class="form-control" id="nombre" placeholder="Name">
      </div>

      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input v-model="user.apellido" type="text" class="form-control" id="apellido" placeholder="LastName">
      </div>

      <div class="form-group">
        <label for="dni">DNI:</label>
        <input v-model="user.dni" type="number" class="form-control" id="dni" placeholder="DNI">
      </div>

      <div class="form-group">
        <label for="role">Role:</label>
        <select v-model="user.role" class="form-control" id="role">
          <option value="CLIENTE">Cliente</option>
          <option value="PASEADOR">Paseador</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
