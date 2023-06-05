<script>
import { storeToRefs } from 'pinia'
import { usePaseadorStore } from '../stores/paseador.js'
import paseadorService from '../services/paseadorService.js'

export default {
    setup() {
        const storePaseador = usePaseadorStore()
        const { paseador } = storeToRefs(storePaseador)
        return {
            paseador
        }
    },
    data() {
        return {
            vue: this,
            zona: "",
            horario: "",
            busquedaRealizada: false,
            textoSearch: "",
            paseadores: [],
            textHelp: ""
        };
    },
    methods: {
        buscar: (zona, horario, vue) => {
            paseadorService.busquedaPaseadores(zona, horario)
                .then(response => {
                    vue.paseadores = response.data
                    vue.textoSearch = (zona != '' && horario != '') ? "zona y horario" : (zona != '') ? "zona" : (horario != '') ? "horario" : ""
                    vue.busquedaRealizada = true
                    vue.textHelp = vue.paseadores.length == 0 ? 'No existen paseos disponibles en la zona y/o horario solicitado.' : 'Se listan los paseos disponibles para contratar.'
                })
                .catch(error => {
                    alert("Error: No se pudo realizar la busqueda.");
                    console.log(error);
                });
        },
        guardarPosibleContrato: (dispoId, vue) => {
            const paseador = vue.paseadores.find(p => p.disponibilidadId === dispoId)
            vue.paseador.paseadorId = paseador.paseadorId
            vue.paseador.nombre = paseador.nombre
            vue.paseador.apellido = paseador.apellido
            vue.paseador.dni = paseador.dni
            vue.paseador.email = paseador.email
            vue.paseador.telefono = paseador.telefono
            vue.paseador.zona = paseador.zona
            vue.paseador.horario = paseador.horario
            vue.paseador.precio = paseador.precio
            vue.paseador.estado = paseador.estado
            vue.paseador.disponibilidadId = paseador.disponibilidadId
        }
    }
}
</script>

<template>
    <div class="container mt-4">
        <h2 class="mb-4">Busqueda</h2>
        <hr>

        <!-- Buscar paseadores -->
        <form @submit.prevent="buscar(zona, horario, vue)">
            <div class="form-group">
                <label for="location">Ubicacion:</label>
                <input v-model="zona" type="text" class="form-control" id="location" placeholder="Location"
                    :disabled="busquedaRealizada">
            </div>
            <div class="form-group">
                <label for="time">Horario:</label>
                <input v-model="horario" type="time" class="form-control" id="time" min="09:00" max="21:00" step="3600"
                    :disabled="busquedaRealizada">
            </div>

            <br>
            <button v-show="zona != '' || horario != ''" type="submit" class="btn btn-primary" style="margin-right: 10px"
                :disabled="busquedaRealizada">Buscar</button>
        </form>
        <br>

        <!-- Seleccionar de paseadores filtrados -->
        <form v-show="busquedaRealizada">
            <h5 class="mb-4">Paseadores (<a v-if="textoSearch != ''">Busqueda realizada por </a>{{ textoSearch }})</h5>
            <p id="help" class="form-text text-muted">{{ textHelp }}</p>
            <table class="table">
                <thead class="text-light bg-primary">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Dni</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Email</th>
                        <th scope="col">Zona</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in paseadores">
                        <th scope="row">
                            <RouterLink to="/contratarPaseador">
                                <button type="submit" class="btn btn-primary" v-on:click="guardarPosibleContrato(p.disponibilidadId, vue)">Contratar</button>
                            </RouterLink>
                        </th>
                        <td>{{ p.nombre }}</td>
                        <td>{{ p.apellido }}</td>
                        <td>{{ p.dni }}</td>
                        <td>{{ p.telefono }}</td>
                        <td>{{ p.email }}</td>
                        <td>{{ p.zona }}</td>
                        <td>{{ p.horario }}</td>
                        <td>{{ p.precio }}</td>
                    </tr>
                </tbody>
            </table>
        </form>
        <br>
        <button class="btn btn-primary" v-show="busquedaRealizada" v-on:click="busquedaRealizada = false;
        zona = '';
        horario = '';
        textHelp = '';
        textoSearch = ''">Volver</button>

    </div>
</template>