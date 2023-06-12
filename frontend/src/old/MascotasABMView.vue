<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import { useMascotaStore } from '../stores/mascota.js'
import mascotaService from '../services/mascotaService.js'

export default {
    setup() {
        const storeUser = useUserStore()
        const storeMascota = useMascotaStore()
        const { user } = storeToRefs(storeUser)
        const { mascota } = storeToRefs(storeMascota)
        return {
            user,
            mascota
        }
    },
    data() {
        return {
            vue: this,
            mascotaExists: false,
            mascotas: []
        };
    },
    methods: {
        obtenerMascotas: (ownerId, vue) => {
            mascotaService.obtenerMascotas(ownerId)
                .then(response => {
                    vue.mascotas = response.data
                    vue.mascotaExists = true
                })
                .catch(error => {
                    alert("Error: No se pudo obtener las mascotas del paseador.");
                    console.log(error)
                });
        },
        eliminarMascota: (id, user, vue) => {
            let result = confirm('¿Esta seguro de querer eliminar la mascota?')
            if (result) {
                mascotaService.eliminarMascota(id)
                    .then(response => {
                        vue.mascotas = vue.obtenerMascotas(user.id, vue)
                        alert('Mascota eliminada correctamente.')
                    })
                    .catch(error => {
                        alert("Error: No se pudo eliminar la mascota.");
                        console.log(error)
                    });
            }
        },
        editarMascota: (id, vue) => {
            const mascota = vue.mascotas.find(m => m.id == id)
            vue.mascota.id = mascota.id
            vue.mascota.nombre = mascota.nombre
            vue.mascota.vacunado = mascota.vacunado
            vue.mascota.tamanio = mascota.tamanio
            vue.mascota.raza = mascota.raza
            vue.mascota.peso = mascota.peso
            vue.mascota.ownerId = mascota.ownerId
        }
    }
}
</script>

<template>
    <div class="container">
        <h2 class="mb-4">Mascotas del cliente (DNI: {{ user.dni }})</h2>
        <button class="btn btn-primary" :disabled="mascotaExists" v-on:click="obtenerMascotas(user.id, vue)">Buscar mascotas</button>
        <hr>

        <p v-if="mascotas.length == 0 && mascotaExists">No tiene mascotas cargadas</p>
        <div class="form-group">
            <table class="table">
                <thead class="text-light bg-primary">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Raza</th>
                        <th scope="col">Vacunado</th>
                        <th scope="col">Tamaño</th>
                        <th scope="col">Peso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="m in mascotas">
                        <td>
                            <button class="btn btn-danger" style="margin-right: 10px"
                                v-on:click="eliminarMascota(m.id, user, vue)">X</button>
                            <RouterLink to="/editarMascota">
                                <button class="btn btn-dark" style="margin-right: 10px" v-on:click="editarMascota(m.id, vue)">Editar</button>
                            </RouterLink>
                        </td>
                        <td>{{ m.nombre }}</td>
                        <td>{{ m.raza }}</td>
                        <td>{{ m.vacunado == 1 ? 'Si' : 'No' }}</td>
                        <td>{{ m.tamanio }}</td>
                        <td>{{ m.peso }} kg.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>

        <RouterLink to="/agregarMascota" v-if="mascotaExists">
            <button class="btn btn-primary" style="margin-right: 10px">Agregar</button>
        </RouterLink>
        <RouterLink to="/mascotas" v-if="mascotaExists">
            <button class="btn btn-primary" style="margin-right: 10px"
                v-on:click="mascotaExists = false; mascotas = []">Volver</button>
        </RouterLink>

    </div>
</template>