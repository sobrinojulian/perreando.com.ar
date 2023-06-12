<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'
import userService from '../../services/userService.js'

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
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        dni: this.user.dni,
        fechaNacimiento: this.user.fechaNacimiento,
        telefono: this.user.telefono,
        direccion: this.user.direccion,
        role: this.user.role,
        saldo: 0
      }
    };
  },
  methods: {
    editar: (user, vue) => {
      user.saldo = user.saldo + vue.user.saldo
      userService.editUser(vue.user.id, user)
        .then(response => {
          if (response.data.respuesta) {
            vue.user.username = response.data.username
            vue.user.email = response.data.email
            vue.user.password = response.data.password
            vue.user.nombre = response.data.nombre
            vue.user.apellido = response.data.apellido
            vue.user.dni = response.data.dni
            vue.user.fechaNacimiento = response.data.fechaNacimiento
            vue.user.telefono = response.data.telefono
            vue.user.direccion = response.data.direccion
            vue.user.role = response.data.role
            vue.user.saldo = response.data.saldo
            alert('Datos de usuario actualizado correctamente.')
            vue.$router.push("/user");
          } else {
            alert(response.data.error)
          }
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
    <h2 class="mb-4">Editar informacion de usuario</h2>
    <hr>

    <form @submit.prevent="editar(user, vue)">

      <!-- Datos Personales de usuario -->
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
        <input v-model="user.fechaNacimiento" type="date" class="form-control" id="fechaNacimiento"
          placeholder="Date of Birth">
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

      <!-- Datos de Direccion de usuario -->
      <br>
      <h5 class="mb-4">Ubicacion</h5>

      <div class="form-group">
        <label for="direccion">Direccion:</label>
        <input v-model="user.direccion" type="text" class="form-control" id="direccion" placeholder="Direccion">
      </div>

      <!-- Asignar Rol del usuario -->
      <!-- <br>
      <h5 class="mb-4">Rol del Usuario</h5>

      <div class="form-group">
        <label for="role">Rol:</label>
        <select v-model="user.role" class="form-control" id="role">
          <option value="CLIENTE">Cliente</option>
          <option value="PASEADOR">Paseador</option>
        </select>
      </div> -->

      <!-- Asignar Saldo del usuario -->
      <br>
      <div class="form-group" v-if="user.role == 'CLIENTE'">
        <h5 class="mb-4">Saldo en cuenta del Cliente</h5>
        <input v-model="user.saldo" type="number" class="form-control" id="saldo" placeholder="Saldo">
        <small id="help" class="form-text text-muted">Solo puede aumentar el importe.</small>
      </div>

      <br>
      <button type="submit" class="btn btn-primary" style="margin-right: 10px">Editar</button>
      <RouterLink to="/user">
        <button class="btn btn-primary" style="margin-right: 10px">Volver</button>
      </RouterLink>
    </form>

  </div>
</template>
