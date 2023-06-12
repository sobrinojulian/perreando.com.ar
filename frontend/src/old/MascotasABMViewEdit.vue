<script>
import { storeToRefs } from 'pinia'
import { useMascotaStore } from '../stores/mascota.js'
import mascotaService from '../services/mascotaService.js'

export default {
    setup() {
        const storeMascota = useMascotaStore()
        const { mascota } = storeToRefs(storeMascota)
        return {
            mascota
        }
    },
    data() {
        return {
            vue: this,
            mascota: {
                id: this.mascota.id,
                nombre: this.mascota.nombre,
                vacunado: this.mascota.vacunado,
                tamanio: this.mascota.tamanio,
                raza: this.mascota.raza,
                peso: this.mascota.peso,
                ownerId: this.mascota.ownerId
            }
        };
    },
    methods: {
        editar: (mascota, vue) => {
            mascotaService.actualizarMascota(mascota)
                .then(response => {
                    vue.mascota.id = response.data.id
                    vue.mascota.nombre = response.data.nombre
                    vue.mascota.vacunado = response.data.vacunado
                    vue.mascota.tamanio = response.data.tamanio
                    vue.mascota.raza = response.data.raza
                    vue.mascota.peso = response.data.peso
                    vue.mascota.ownerId = response.data.ownerId
                    alert('Datos de mascota actualizados correctamente.')
                    vue.$router.push("/mascotas");
                })
                .catch(error => {
                    alert("Error: No se pudo actualizar la mascota.");
                    console.log(error);
                });
        }
    }
}
</script>

<template>
    <div class="container">
        <h2 class="mb-4">Editar mascota</h2>
        <hr>

        <form @submit.prevent="editar(mascota, vue)">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input v-model="mascota.nombre" type="text" class="form-control" id="nombre" placeholder="Name">
            </div>
            <div class="form-group">
                <label for="vacunado">Vacunado:</label>
                <select v-model="mascota.vacunado" class="form-select" id="vaccinated">
                    <option value=1>Si</option>
                    <option value=0>No</option>
                </select>
            </div>
            <div class="form-group">
                <label for="size">Tamaño:</label>
                <select v-model="mascota.tamanio" class="form-select" id="size">
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="big">Grande</option>
                </select>
            </div>
            <div class="form-group">
                <label for="raza">Raza:</label>
                <input v-model="mascota.raza" type="text" class="form-control" id="raza" placeholder="Raza">
            </div>
            <div class="form-group">
                <label for="peso">Peso (En Kg):</label>
                <input v-model="mascota.peso" type="number" class="form-control" id="peso" placeholder="Peso">
            </div>

            <br>
            <button type="submit" class="btn btn-primary" style="margin-right: 10px">Editar</button>
            <RouterLink to="/mascotas">
                <button class="btn btn-primary" style="margin-right: 10px">Volver</button>
            </RouterLink>
        </form>

    </div>
</template>