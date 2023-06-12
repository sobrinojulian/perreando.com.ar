<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import mascotaService from '../services/mascotaService.js'

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
            mascota: {
                nombre: "",
                vacunado: "",
                tamanio: "",
                raza: "",
                peso: "",
                ownerId: this.user.id
            }
        };
    },
    methods: {
        agregar: (vue) => {
            mascotaService.guardarMascota(vue.mascota)
                .then(response => {
                    alert('Mascota agregada correctamente.')
                    vue.$router.push("/mascotas");
                })
                .catch(error => {
                    alert("Error: No se agrego la mascota.");
                    console.log(error);
                });
        }
    }
}
</script>

<template>
    <div class="container">
        <h2 class="mb-4">Agregar mascota</h2>
        <hr>

        <form @submit.prevent="agregar(vue)">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input v-model="mascota.nombre" type="text" class="form-control" id="nombre" placeholder="Name" required>
            </div>
            <div class="form-group">
                <label for="vacunado">Vacunado:</label>
                <select v-model="mascota.vacunado" class="form-select" id="vaccinated" required>
                    <option value=1>Si</option>
                    <option value=0>No</option>
                </select>
            </div>
            <div class="form-group">
                <label for="size">Tamaño:</label>
                <select v-model="mascota.tamanio" class="form-select" id="size" required>
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="big">Grande</option>
                </select>
            </div>
            <div class="form-group">
                <label for="raza">Raza:</label>
                <input v-model="mascota.raza" type="text" class="form-control" id="raza" placeholder="Raza" required>
            </div>
            <div class="form-group">
                <label for="peso">Peso (En Kg):</label>
                <input v-model="mascota.peso" type="number" class="form-control" id="peso" placeholder="Peso" required>
            </div>

            <br>
            <button type="submit" class="btn btn-primary" style="margin-right: 10px">Agregar</button>
            <RouterLink to="/mascotas">
                <button class="btn btn-primary" style="margin-right: 10px">Volver</button>
            </RouterLink>
        </form>

    </div>
</template>