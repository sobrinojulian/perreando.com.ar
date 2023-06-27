<script>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'
import paseadorService from '../../services/disponibilidadService.js'

export default {
  setup() {
    const storeUser = useUserStore()
    const { user } = storeToRefs(storeUser)

    const disponibilidades = ref([])
    const dispoExists = ref(false)

    const obtenerPaseadorDisponibilidades = paseadorId => {
      paseadorService
        .obtenerDisponibilidadesByPaseador(paseadorId)
        .then(response => {
          disponibilidades.value = response.data
          dispoExists.value = true
        })
        .catch(error => {
          alert('Error: No se pudo obtener las disponibilidades del paseador.')
          console.log(error)
        })
    }

    const eliminarDisponibilidad = (id, estado) => {
      let result = confirm('¿Está seguro de querer eliminar la disponibilidad?')
      if (result) {
        if (estado === 0) {
          paseadorService
            .deleteDisponibilidad(id)
            .then(response => {
              if (response.data.respuesta) {
                obtenerPaseadorDisponibilidades(user.value.id)
                alert('Disponibilidad eliminada correctamente.')
              } else {
                alert(response.data.error)
              }
            })
            .catch(error => {
              alert('Error: No se pudo eliminar la disponibilidad.')
              console.log(error)
            })
        } else {
          alert('No se puede eliminar la disponibilidad porque está reservada para un paseo.')
        }
      }
    }

    onMounted(() => {
      obtenerPaseadorDisponibilidades(user.value.id)
    })

    return {
      user,
      disponibilidades,
      dispoExists,
      obtenerPaseadorDisponibilidades,
      eliminarDisponibilidad
    }
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Disponibilidades de paseador (DNI: {{ user.dni }})</h2>
    <hr>

    <p v-if="disponibilidades.length === 0 && dispoExists">No tiene disponibilidades cargadas</p>
    <div class="form-group">
      <table class="table">
        <thead class="text-light bg-primary">
          <tr>
            <th scope="col">Zona</th>
            <th scope="col">Fecha</th>
            <th scope="col">Horario</th>
            <th scope="col">Precio</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in disponibilidades">
            <td>{{ d.zona }}</td>
            <td>{{ d.fecha }}</td>
            <td>{{ d.horario }}</td>
            <td>{{ d.precio }}</td>
            <td>{{ d.estado == 0 ? 'Disponible' : 'Contratado' }}</td>
            <td>
              <button class="btn btn-danger" style="margin-right: 10px"
                v-on:click="eliminarDisponibilidad(d._id, d.estado, vue)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>

    <RouterLink to="/addDisponibilidades" v-if="dispoExists">
      <button class="btn btn-primary" style="margin-right: 10px">Agregar</button>
    </RouterLink>
  </div>
</template>
