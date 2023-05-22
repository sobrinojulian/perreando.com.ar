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
    <h2>Regitro de usuario</h2>
    
    <form @submit.prevent="registrar(user, vue)">
        <label>Nombre de usuario:</label>
        <br>
        <input v-model="user.username" type="text" placeholder="Username">
        <br>
        <label>Email:</label>
        <br>
        <input v-model="user.email" type="email" placeholder="Email address">
        <br>
        <label>Contraseña:</label>
        <br>
        <input v-model="user.password" type="password" placeholder="Password">
        <br>
        <label>Nombre:</label>
        <br>
        <input v-model="user.nombre" type="text" placeholder="Name">
        <br>
        <label>Apellido:</label>
        <br>
        <input v-model="user.apellido" type="text" placeholder="LastName">
        <br>
        <label>Dni:</label>
        <br>
        <input v-model="user.dni" type="number" placeholder="Dni">
        <br>
        <label>Role:</label>
        <br>
        <select v-model="user.role">
            <option value="CLIENTE">Cliente</option>
            <option value="PASEADOR">Paseador</option>
        </select>
        <br>

        <button type="submit">Registrar</button>
    </form>
</template>