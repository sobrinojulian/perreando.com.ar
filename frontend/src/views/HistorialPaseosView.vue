<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import paseoService from '../services/paseoService.js'

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
            paseoExists: false,
            paseos: [],
            role: this.user.role == 'CLIENTE' ? 'Paseador' : this.user.role == 'PASEADOR' ? 'Cliente' : ""
        };
    },
    methods: {
        obtenerPaseos: (user, vue) => {
            paseoService.obtenerPaseosHistorial(user.role, user.id)
                .then(response => {
                    vue.paseos = response.data
                    vue.paseoExists = true
                })
                .catch(error => {
                    alert("Error: No se pudo obtener los paseos programados.");
                    console.log(error)
                });
        }
    }
}
</script>

<template>
    <div class="container mt-4">
        <h2 class="mb-4">Historial de paseos (DNI: {{ user.dni }})</h2>
        <button class="btn btn-primary" :disabled="paseoExists" v-on:click="obtenerPaseos(user, vue)">Buscar
            paseos</button>
        <hr>

        <p v-if="paseos.length <= 0 && paseoExists">No tiene historial de paseos concretados</p>
        <div class="form-group">
            <table class="table">
                <thead class="text-light bg-primary">
                    <tr>
                        <th scope="col">Zona</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Total Abonado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Nombre Mascota</th>
                        <th scope="col">Nombre {{ role }}</th>
                        <th scope="col">Apellido {{ role }}</th>
                        <th scope="col">Dni {{ role }}</th>
                        <th scope="col">Telefono {{ role }}</th>
                        <th scope="col">Email {{ role }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in paseos">
                        <td>{{ p.zona }}</td>
                        <td>{{ p.horario }}</td>
                        <td>{{ p.total }}</td>
                        <td>{{ p.fecha }}</td>
                        <td>{{ p.nombreMascota }}</td>
                        <td>{{ p.nombrePersona }}</td>
                        <td>{{ p.apellidoPersona }}</td>
                        <td>{{ p.dniPersona }}</td>
                        <td>{{ p.telefonoPersona }}</td>
                        <td>{{ p.emailPersona }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>

        <RouterLink to="/historialPaseos" v-if="paseoExists">
            <button class="btn btn-primary" style="margin-right: 10px"
                v-on:click="paseoExists = false; paseos = []">Volver</button>
        </RouterLink>
    </div>
</template>