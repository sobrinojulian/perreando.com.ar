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
            dispo: {
                zona: "",
                horario: "",
                precio: 0,
                estado: 0,
                paseadorId: this.user.id
            }
        };
    },
    methods: {
        cargar: (vue) => {
            paseadorService.cargarDisponibilidad(vue.dispo)
                .then(response => {
                    alert('Disponibilidades generadas correctamente.')
                    vue.$router.push("/disponibilidadPaseador");
                })
                .catch(error => {
                    alert("Error: No se generaron las disponibilidades.");
                    console.log(error);
                });
        }
    }
}
</script>

<template>
    <div class="container">
        <h2 class="mb-4">Cargar Disponibilidad</h2>
        <hr>

        <form @submit.prevent="cargar(vue)">
            <div class="form-group">
                <h5>Ubicacion:</h5>
                <input v-model="dispo.zona" type="text" class="form-control" id="location" placeholder="Location" required>
            </div>
            <br>

            <div class="form-group">
                <h5>Horario (De 09:00hs a 21:00hs)</h5>
                <input v-model="dispo.horario" type="time" class="form-control" id="time" min="09:00" max="21:00" step="3600" required>
            </div>
            <br>
            
            <div class="form-group">
                <h5>Precio: $<label>{{ dispo.precio }}</label></h5>
                <input v-model="dispo.precio" type="number" class="form-control" id="price" placeholder="Price" required>
            </div>


            <br>
            <button type="submit" class="btn btn-primary" style="margin-right: 10px">Cargar</button>
            <RouterLink to="/disponibilidadPaseador">
                <button class="btn btn-primary" style="margin-right: 10px">Volver</button>
            </RouterLink>
        </form>



    </div>
</template>