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
        password: "",
      }
    };
  },
  methods: {
    loguear: (user, vue) => {
      userService.login(user)
      .then(response => {
          vue.user.username = response.data.username
          vue.user.email = response.data.email
          vue.user.password = response.data.password
          vue.user.nombre = response.data.nombre
          vue.user.apellido = response.data.apellido
          vue.user.dni = response.data.dni
          vue.user.role = response.data.role
          vue.$router.push("/");
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
    <h2>Iniciar sesion</h2>
    
    <form @submit.prevent="loguear(user, vue)">
        <label>Nombre de usuario:</label>
        <br>
        <input v-model="user.username" type="text" placeholder="Username">
        <br>
        <label>Contraseña:</label>
        <br>
        <input v-model="user.password" type="password" placeholder="Password">
        <br>

        <button type="submit">Ingresar</button>
    </form>
</template>