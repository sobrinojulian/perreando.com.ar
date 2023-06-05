<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import paseadorService from '../services/paseadorService.js'

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
            dispoExists: false,
            disponibilidades: []
        };
    },
    methods: {
        obtenerPaseadorDisponibilidades: (id, vue) => {
            paseadorService.obtenerDisponibilidades(id)
                .then(response => {
                    vue.disponibilidades = response.data
                    vue.dispoExists = true
                })
                .catch(error => {
                    alert("Error: No se pudo obtener las disponibilidades del paseador.");
                    console.log(error)
                });
        },
        eliminarDisponibilidad: (id, estado, vue) => {
            let result = confirm('¿Esta seguro de querer eliminar la disponibilidad?')
            if (result) {
                if (estado == 0) {
                    paseadorService.deleteDisponibilidad(id)
                        .then(response => {
                            vue.disponibilidades = vue.obtenerPaseadorDisponibilidades(vue.user.id, vue)
                            alert('Disponibilidad eliminada correctamente.')
                        })
                        .catch(error => {
                            alert("Error: No se pudo eliminar la disponibilidad.");
                            console.log(error)
                        });
                } else {
                    alert('No se puede eliminar la disponibilidad porque esta reservada para un paseo')
                }
            }
        }
    }
}
</script>

<template>
    <div class="container mt-4">
        <h2 class="mb-4">Disponibilidades de paseador (DNI: {{ user.dni }})</h2>
        <button class="btn btn-primary" :disabled="dispoExists"
            v-on:click="obtenerPaseadorDisponibilidades(user.id, vue)">Buscar disponibilidades</button>
        <hr>

        <p v-if="disponibilidades.length == 0 && dispoExists">No tiene disponibilidades cargadas</p>
        <div class="form-group">
            <table class="table">
                <thead class="text-light bg-primary">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Zona</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="d in disponibilidades">
                        <td>
                            <button class="btn btn-danger" style="margin-right: 10px"
                                v-on:click="eliminarDisponibilidad(d.disponibilidadId, d.estado, vue)">X</button>
                        </td>
                        <td>{{ d.zona }}</td>
                        <td>{{ d.horario }}</td>
                        <td>{{ d.precio }}</td>
                        <td>{{ d.estado == 0 ? 'Disponible' : 'Contratado' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>

        <RouterLink to="/addDisponibilidades" v-if="dispoExists">
            <button class="btn btn-primary" style="margin-right: 10px">Agregar</button>
        </RouterLink>
        <RouterLink to="/disponibilidadPaseador" v-if="dispoExists">
            <button class="btn btn-primary" style="margin-right: 10px"
                v-on:click="dispoExists = false; disponibilidades = []">Volver</button>
        </RouterLink>

    </div>
</template>