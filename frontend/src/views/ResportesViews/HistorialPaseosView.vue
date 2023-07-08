<script>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user.js'
import paseoService from '@/services/paseoService.js'

export default {
  setup() {
    const storeUser = useUserStore()
    const { user } = storeToRefs(storeUser)

    const paseos = ref([])
    const paseoExists = ref(false)
    const role =
      user.value.role === 'CLIENTE'
        ? 'Paseador'
        : user.value.role === 'PASEADOR'
        ? 'Cliente'
        : ''

    const obtenerPaseos = () => {
      paseoService
        .obtenerPaseosHistorial(user.value.role, user.value.id)
        .then(response => {
          paseos.value = response.data
          paseoExists.value = true
        })
        .catch(error => {
          alert('Error: No se pudo obtener los paseos programados.')
          console.log(error)
        })
    }
    const calificarPaseo = async (paseo) => {
      console.log(paseo)
      const calificacion = prompt('Ingrese la calificación (0-5):')
      if (calificacion !== null && calificacion !== '') {
        const parsedCalificacion = parseFloat(calificacion)
        if (!isNaN(parsedCalificacion) && parsedCalificacion >= 0 && parsedCalificacion <= 5) {
          try {
            const paseoId = paseo._id
            console.log(paseoId)
            const response = await paseoService.calificar(paseoId, parsedCalificacion)
            obtenerPaseos() // Refresh the paseos after saving
          } catch (error) {
            alert(error.message)
          }
        } else {
          alert('Por favor, ingrese una calificación válida entre 0 y 5.')
        }
      }
    }

    onMounted(() => {
      obtenerPaseos()
    })

    return {
      user,
      paseos,
      paseoExists,
      role,
      obtenerPaseos,
      calificarPaseo
    }
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Historial de paseos (DNI: {{ user.dni }})</h2>
    <hr />

    <p v-if="paseos.length <= 0 && paseoExists">
      No tiene historial de paseos concretados
    </p>
    <div v-if="paseos.length >= 1" class="form-group">
      <table class="table">
        <thead class="text-light bg-primary">
          <tr>
            <th scope="col">Zona</th>
            <th scope="col">Fecha</th>
            <th scope="col">Horario</th>
            <th scope="col">Nombre Mascota</th>
            <th scope="col">Nombre {{ role }}</th>
            <th scope="col">Apellido {{ role }}</th>
            <th scope="col">Dni {{ role }}</th>
            <th scope="col">Email {{ role }}</th>
            <th scope="col">Telefono {{ role }}</th>
            <th scope="col">Direccion {{ role }}</th>
            <th scope="col">Total Abonado</th>
            <th scope="col">Calificacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in paseos">
            <td>{{ p.zona }}</td>
            <td>{{ p.fecha }}</td>
            <td>{{ p.horario }}</td>
            <td>{{ p.nombreMascota }}</td>
            <td>{{ p.nombrePersona }}</td>
            <td>{{ p.apellidoPersona }}</td>
            <td>{{ p.dniPersona }}</td>
            <td>{{ p.emailPersona }}</td>
            <td>{{ p.telefonoPersona }}</td>
            <td>{{ p.direccionPersona }}</td>
            <td>{{ p.total }}</td>
            <td>
              <template v-if="p.calificacion === -1">
                <button class="btn btn-primary" @click="calificarPaseo(p)">
                  Calificar
                </button>
              </template>
              <template v-else>
                {{ p.calificacion }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
