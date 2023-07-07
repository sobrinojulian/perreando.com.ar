<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'
const store = useUserStore()
const { user } = storeToRefs(store)
</script>
<template>
  <div class="container">
    <div id="servicios" class="claseServ mt-4">
      <h2 style="text-align: center; color: black">SERVICIOS</h2>
      <p
        style="text-align: center; color: black"
        v-if="user.role === 'PASEADOR'">
        COMO PASEADOR PODRAS DISFRUTAR DE LOS SIGUENTES SERVICIOS
      </p>
      <p
        style="text-align: center; color: black"
        v-if="user.role === 'CLIENTE'">
        COMO CLIENTE PODRAS DISFRUTAR DE LOS SIGUENTES SERVICIOS
      </p>
      <div class="row">
        <!-- Paseos programados -->
        <div class="col-sm-6 mb-3 mb-sm-10">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/iconopaseoperro.png"
                class="card-img-top"
                alt="Paseos programados"
                style="width: auto; height: 50px" />
              <h5 class="card-title">Paseos programados</h5>
              <p class="card-text" style="font-style: italic">
                Podrás ver los paseos programados
              </p>
              <router-link to="/paseosProgramados" class="btn btn-primary"
                >Visitar</router-link
              >
            </div>
          </div>
        </div>
        <!-- Historial de Paseos -->
        <div class="col-sm-6 mb-3 mb-sm-10">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/iconohistorial.png"
                class="card-img-top"
                alt="Historial de Paseos"
                style="width: auto; height: 50px" />
              <h5 class="card-title">Historial de Paseos</h5>
              <p class="card-text" style="font-style: italic">
                Ver tu historial de paseos realizados
              </p>
              <router-link to="/historialPaseos" class="btn btn-primary"
                >Visitar</router-link
              >
            </div>
          </div>
        </div>
        <!-- Mis Datos -->
        <div class="col-sm-6 mb-3 mb-sm-10">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/iconoperfil.png"
                class="card-img-top"
                alt="Mis Datos"
                style="width: auto; height: 50px" />
              <h5 class="card-title">Mis Datos</h5>
              <p class="card-text" style="font-style: italic">
                Podrás ver o modificar tus datos personales
              </p>
              <router-link to="/user" class="btn btn-primary"
                >Visitar</router-link
              >
            </div>
          </div>
        </div>

        <!-- Modificar tu horario y zona Paseador-->
        <div class="col-sm-6 mb-3 mb-sm-10" v-if="user.role === 'PASEADOR'">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/iconozonahorario.png"
                class="card-img-top"
                alt="Modificar tu horario y zona"
                style="width: auto; height: 50px" />
              <h5 class="card-title">Modificar tu horario y zona</h5>
              <p class="card-text" style="font-style: italic">
                Podrás modificar tu disponibilidad y cargar tus zonas y horarios
                preferentes
              </p>
              <router-link to="/disponibilidadPaseador" class="btn btn-primary"
                >Visitar</router-link
              >
            </div>
          </div>
        </div>
        <!-- Mascotas Cliente-->
        <div class="col-sm-6 mb-3 mb-sm-10" v-if="user.role === 'CLIENTE'">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/iconomascotas.png"
                class="card-img-top"
                alt="Mis Datos"
                style="width: auto; height: 50px" />
              <h5 class="card-title">Mis Mascotas</h5>
              <p class="card-text" style="font-style: italic">
                Podrás ver y modificar tus Mascotas
              </p>
              <router-link to="/mascotas" class="btn btn-primary"
                >Visitar</router-link
              >
            </div>
          </div>
        </div>
        <!-- Contratar Paseador -->
        <div class="col-sm-6 mb-3 mb-sm-10" v-if="user.role === 'CLIENTE'">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/iconocontratar.png"
                class="card-img-top"
                alt="Mis Datos"
                style="width: auto; height: 50px" />
              <h5 class="card-title">Contratar Paseador</h5>
              <p class="card-text" style="font-style: italic">
                Podrás buscar y elegir el paseador que deseas contratar
              </p>
              <router-link to="/busquedaPaseadores" class="btn btn-primary"
                >Visitar</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
