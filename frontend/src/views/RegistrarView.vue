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
        fechaNacimiento: "",
        telefono: "",
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
          vue.user.fechaNacimiento = response.data.fechaNacimiento
          vue.user.telefono = response.data.telefono
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
    <h2 class="mb-4">Registro de usuario</h2><hr>

    <form @submit.prevent="registrar(user, vue)">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Username">
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
      </div>

      <!-- Datos Personales de usuario -->
      <br>
      <h5 class="mb-4">Datos Personales</h5>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input v-model="user.nombre" type="text" class="form-control" id="nombre" placeholder="Name">
      </div>

      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input v-model="user.apellido" type="text" class="form-control" id="apellido" placeholder="Last Name">
      </div>

      <div class="form-group">
        <label for="dni">DNI:</label>
        <input v-model="user.dni" type="number" class="form-control" id="dni" placeholder="DNI">
      </div>

      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input v-model="user.fechaNacimiento" type="date" class="form-control" id="fechaNacimiento" placeholder="Date of Birth">
      </div>

      <!-- Datos de Contacto de usuario -->
      <br>
      <h5 class="mb-4">Datos de Contacto</h5>      

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" class="form-control" id="email" placeholder="Email Address">
      </div>

      <div class="form-group">
        <label for="telefono">Telefono:</label>
        <input v-model="user.telefono" type="number" class="form-control" id="telefono" placeholder="Phone Number">
      </div>

      <!-- Asignar Rol del usuario -->
      <br>
      <h5 class="mb-4">Rol del Usuario</h5>

      <div class="form-group">
        <label for="role">Rol:</label>
        <select v-model="user.role" class="form-control" id="role">
          <option value="CLIENTE">Cliente</option>
          <option value="PASEADOR">Paseador</option>
        </select>
      </div>

      <br>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
