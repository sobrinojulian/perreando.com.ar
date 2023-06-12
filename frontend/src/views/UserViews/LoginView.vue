<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'
import userService from '../../services/userService'

export default {
  setup() {
    const storeUser = useUserStore()
    const { user } = storeToRefs(storeUser)
    return {
      user,
      storeUser
    }
  },
  data() {
    return {
      vue: this,
      user: {
        username: "",
        password: "",
      }
    };
  },
  methods: {
    loguear: (user, vue, storeUser) => {
      userService.loginUser(user.username, user.password)
        .then(response => {
          if (response.data.respuesta) {
            vue.user.id = response.data._id
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
            storeUser.updateUser(vue.user)
            vue.$router.push("/");
          } else {
            alert(response.data.error)
          }
        })
        .catch(error => {
          alert("Error: Username y/o Password ingresados son incorrectos.");
          console.log(error);
        });

    }
  }
}
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Iniciar sesión</h2>
    <hr>

    <form @submit.prevent="loguear(user, vue, storeUser)">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Username" required>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password" required>
      </div>

      <br>
      <button type="submit" class="btn btn-primary">Ingresar</button>
    </form>
  </div>
</template>