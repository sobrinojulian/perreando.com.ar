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
            textoSearch: ""
        };
    },
    methods: {
        // buscar: (zona, horario, vue) => {
        //     vue.busquedaRealizada = true
        //     vue.textoSearch = (zona != '' && horario != '') ? "Zona y Horario" : (zona != '') ? "Zona" : (horario != '') ? "Horario" : ""
        // }
        buscar: (zona, horario, vue) => {
            paseadorService.busquedaPaseadores(zona, horario)
                .then(response => {
                    vue.textoSearch = vue.textoSearch || (zona != '' && horario != '') ? "zona y horario" : (zona != '') ? "zona" : (horario != '') ? "horario" : ""

                    vue.paseador.paseadorId = response.data.paseadorId
                    vue.paseador.nombre = response.data.nombre
                    vue.paseador.apellido = response.data.apellido
                    vue.paseador.dni = response.data.dni
                    vue.paseador.email = response.data.email
                    vue.paseador.telefono = response.data.telefono
                    vue.paseador.zona = response.data.zona
                    vue.paseador.horario = response.data.horario
                    vue.paseador.precio = response.data.precio
                    vue.paseador.disponibilidadId = response.data.disponibilidadId
                    vue.busquedaRealizada = true
                })
                .catch(error => {
                    alert("Error: No se pudo realizar la busqueda." + error);
                    console.log(error);
                });
        }
    }
}
</script>

<template>
    <div class="container">        
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
                    <tr>
                        <th scope="row"><button type="button" class="btn btn-light">+</button></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row"><button type="button" class="btn btn-light">+</button></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row"><button type="button" class="btn btn-light">+</button></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <br>
            <button type="submit" class="btn btn-primary" style="margin-right: 10px">Contratar</button>
        </form>




    </div>
</template>