<script>
import { storeToRefs } from 'pinia'
import { usePaseadorStore } from '../stores/paseador.js'
import { useUserStore } from '../stores/user.js'
import paseoService from '../services/paseoService.js'

export default {
    setup() {
        const storePaseador = usePaseadorStore()
        const storeUser = useUserStore()
        const { paseador } = storeToRefs(storePaseador)
        const { user } = storeToRefs(storeUser)
        return {
            paseador,
            user
        }
    },
    data() {
        return {
            vue: this,
            PORC_RECARGO: 10,
            seleccion: false,
            mascotaSeleccionada: {
                id: "",
                nombre: ""
            },
            paseo: {
                clienteId: this.user.id,
                paseadorId: this.paseador.paseadorId,
                disponibilidadId: this.paseador.disponibilidadId,
                horario: this.paseador.horario,
                zona: this.paseador.zona,
                precio: this.paseador.precio,
                recargo: 0,
                mascotaId: "",
                total: 0,
                fecha: ""
            },
            mascotas: [
                {
                    id: 1,
                    nombre: 'Teddy',
                    vacunado: true,
                    tamanio: 'big',
                    raza: 'Pastor Aleman',
                    peso: '19kg'
                },
                {
                    id: 2,
                    nombre: 'Pity',
                    vacunado: true,
                    tamanio: 'small',
                    raza: 'Dogo',
                    peso: '21kg'
                }
            ]
        };
    },
    methods: {
        seleccionarMascota: (id, nombre, vue) => {
            vue.mascotaSeleccionada.id = id
            vue.mascotaSeleccionada.nombre = nombre
            vue.seleccion = (vue.mascotaSeleccionada.nombre === nombre)
        },
        volverASeleccionar: (vue) => {
            vue.mascotaSeleccionada.id = ""
            vue.mascotaSeleccionada.nombre = ""
            vue.seleccion = (vue.mascotaSeleccionada.nombre != "")
        },
        contratar: (paseo, vue) => {
            paseo.recargo = ((paseo.precio * 10) / 100)
            paseo.mascotaId = vue.mascotaSeleccionada.id
            paseo.total = (parseFloat(paseo.precio) + parseFloat(paseo.recargo))

            if (vue.user.saldo < paseo.total) {
                alert(`No se pueder realizar la contratacion porque su saldo es menor al total del paseo. Saldo: $${vue.user.saldo} - Total: $${paseo.total}.`)
                vue.$router.push("/busquedaPaseadores")
            } else {
                paseoService.grabarPaseo(paseo)
                    .then(response => {
                        vue.user.saldo = vue.user.saldo - response.data.total
                        alert('Paseo contratado correctamente.')
                        vue.$router.push("/busquedaPaseadores")
                    })
                    .catch(error => {
                        alert("Error: No se pudo realizar la contratacion del paseo.");
                        console.log(error);
                    });
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <h2 class="mb-4">Contratar Paseador - Zona: <b>{{ paseador.zona }}</b> / Horario: <b>{{ paseador.horario }}</b> /
            Precio: <b>${{ paseador.precio }}</b></h2>
        <hr>
        <b style="font-style: italic;">Se aplicara un recargo del %{{ PORC_RECARGO }} por servicio.</b>
        <hr>

        <!-- Contratar paseadores -->
        <div class="form-group">
            <h4 for="paseador">Paseador:</h4>
            <div class="form-group">
                <label for="nombre">Nombre: <b>{{ paseador.nombre }}</b></label>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido: <b>{{ paseador.apellido }}</b></label>
            </div>
            <div class="form-group">
                <label for="dni">DNI: <b>{{ paseador.dni }}</b></label>
            </div>
            <div class="form-group">
                <label for="email">Email: <b>{{ paseador.email }}</b></label>
            </div>
            <div class="form-group">
                <label for="telefono">Telefono: <b>{{ paseador.telefono }}</b></label>
            </div>
            <br>

            <h4 for="cliente">Cliente:</h4>
            <div class="form-group">
                <label for="nombre">Nombre: <b>{{ user.nombre }}</b></label>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido: <b>{{ user.apellido }}</b></label>
            </div>
            <div class="form-group">
                <label for="dni">DNI: <b>{{ user.dni }}</b></label>
            </div>
            <div class="form-group">
                <label for="email">Email: <b>{{ user.email }}</b></label>
            </div>
            <div class="form-group">
                <label for="telefono">Telefono: <b>{{ user.telefono }}</b></label>
            </div>
            <br>
        </div>

        <div class="form-group">
            <h5 for="select">Seleccionar mascota</h5>
            <table class="table" v-if="mascotas.length != 0">
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
                        <th scope="row"><button class="btn btn-primary" v-on:click="seleccionarMascota(m.id, m.nombre, vue)"
                                :disabled="seleccion">+</button></th>
                        <td>{{ m.nombre }}</td>
                        <td>{{ m.raza }}</td>
                        <td>{{ m.vacunado }}</td>
                        <td>{{ m.tamanio }}</td>
                        <td>{{ m.peso }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else="mascotas.length != 0">No puede avanzar con la contratacion porque usted no tiene Mascotas.</p>
        </div>

        <p v-if="seleccion">
            <button class="btn btn-danger" v-on:click="volverASeleccionar(vue)">X</button>
            La mascota seleccionada es <b>{{ mascotaSeleccionada.nombre }}</b>
        </p>
        <br>

        <form @submit.prevent="contratar(paseo, vue)">
            <button v-if="seleccion" type="submit" class="btn btn-primary" style="margin-right: 10px">Contratar</button>
            <RouterLink to="/busquedaPaseadores">
                <button class="btn btn-primary" style="margin-right: 10px">Volver a Busqueda</button>
            </RouterLink>
        </form>
    </div>
</template>