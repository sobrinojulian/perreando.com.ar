<script>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'
import paseoService from '../../services/paseoService.js'

import MascotasService from "../../services/mascotaService"; //Mascota

export default {
  setup() {
    const storeUser = useUserStore()
    const { user } = storeToRefs(storeUser)

    const paseos = ref([])
    const paseoExists = ref(false)
    const role = user.value.role === 'CLIENTE' ? 'Paseador' : user.value.role === 'PASEADOR' ? 'Cliente' : ''

    const obtenerPaseos = () => {
      paseoService
        .obtenerPaseosProgramados(user.value.role, user.value.id)
        .then(response => {
          paseos.value = response.data
          paseoExists.value = true
        })
        .catch(error => {
          alert('Error: No se pudo obtener los paseos programados.')
          console.log(error)
        })
    }

    onMounted(() => {
      obtenerPaseos()
    })

    return {
      user,
      paseos,
      paseoExists,
      role,
      obtenerPaseos
    }
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Paseos programados (DNI: {{ user.dni }})</h2>
    <hr>

    <p v-if="paseos.length <= 0 && paseoExists">No tiene paseos programados</p>
    <div v-if="paseos.length >= 1" class="form-group">
      <table class="table">
        <thead class="text-light bg-primary">
          <tr>
            <th scope="col">Zona</th>
            <th scope="col">Horario</th>
            <th scope="col">Fecha</th>
            <th scope="col">Nombre Mascota</th>
            <th scope="col">Nombre {{ role }}</th>
            <th scope="col">Apellido {{ role }}</th>
            <th scope="col">Dni {{ role }}</th>
            <th scope="col">Email {{ role }}</th>
            <th scope="col">Telefono {{ role }}</th>
            <th scope="col">Direccion {{ role }}</th>
            <th scope="col">Total Abonado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in paseos">
            <td>{{ p.zona }}</td>
            <td>{{ p.horario }}</td>
            <td>{{ p.fecha }}</td>
            <td>{{ p.nombreMascota }}</td>
            <td>{{ p.nombrePersona }}</td>
            <td>{{ p.apellidoPersona }}</td>
            <td>{{ p.dniPersona }}</td>
            <td>{{ p.emailPersona }}</td>
            <td>{{ p.telefonoPersona }}</td>
            <td>{{ p.direccionPersona }}</td>
            <td>{{ p.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
