<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'

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
      vue: this
    };
  }
}
</script>

<template>    
  <div class="container mt-4">
    <h2 class="mb-4">Informacion de usuario</h2><hr>

    <form>      
      <h5 class="mb-4">El rol del usuario <b>{{ vue.user.username }}</b> es: <b>{{ vue.user.role }}</b></h5>

      <!-- Datos Personales de usuario -->
      <h5 class="mb-4">Datos Personales</h5>

      <div class="form-group">
        <label for="nombre">Nombre: <b>{{ vue.user.nombre }}</b></label>
      </div>
      <div class="form-group">
        <label for="apellido">Apellido: <b>{{ vue.user.apellido }}</b></label>
      </div>
      <div class="form-group">
        <label for="dni">DNI: <b>{{ vue.user.dni }}</b></label>
      </div>
      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento: <b>{{ vue.user.fechaNacimiento }}</b></label>
      </div>

      <!-- Datos de Contacto de usuario -->
      <br>
      <h5 class="mb-4">Datos de Contacto</h5>

      <div class="form-group">
        <label for="email">Email: <b>{{ vue.user.email }}</b></label>
      </div>
      <div class="form-group">
        <label for="telefono">Telefono: <b>{{ vue.user.telefono }}</b></label>
      </div>

      <!-- Datos de Saldo de usuario -->
      <br>
      <h5 class="mb-4">Saldo: $<b>{{ vue.user.saldo }}</b></h5>

    </form>
    
    <br>
    <RouterLink to="/editUser">
        <button class="btn btn-primary" style="margin-right: 10px">Editar</button>
    </RouterLink>
    <RouterLink to="/deleteUser">
        <button class="btn btn-danger" style="margin-right: 10px">Eliminar</button>
    </RouterLink>
  </div>
</template>