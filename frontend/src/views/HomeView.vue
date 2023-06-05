<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'
const store = useUserStore();
const { user } = storeToRefs(store);

</script>

<template>
  <div v-if="user.role !== 'CLIENTE' && user.role !== 'PASEADOR'">
    <div id="carouselPortada" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselPortada" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselPortada" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselPortada" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div v-for="(item, index) in carouselItems" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="item.image" class="d-block w-100" :alt="'Slide ' + (index + 1)">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ item.title }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselPortada" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselPortada" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
    <div id="contacto" class="container bg-light py-5">
      <div class="row">
        <!-- Datos de contacto -->
        <div class="col-md-3">
          <div class="py-4">
            <h4 class="border-bottom pb-2">Contáctenos</h4>
            <p>Su consulta no nos molesta!</p>
            <p><i class="bi bi-phone"></i> +54 11 5888 9499</p>
            <p><i class="bi bi-whatsapp"></i> +54 11 5888 2999</p>
            <p><i class="bi bi-envelope"></i> atclientes@perreando.com.ar</p>
          </div>
        </div>

        <!-- Información sobre paseos de perros -->
        <div id="divInformacion" class="col-md-9">
          <h2>¿Le estás dando a tu perro lo que realmente necesita?</h2>
          <p>El paseo diario es una actividad fundamental para la calidad de vida de tu perro</p>

          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <img src="/ejerciciomascota.jpg" class="card-img-top" alt="Ejercicio" width="150px" height="150px">
                <div class="card-body">
                  <h5 class="card-title">Ejercicio</h5>
                  <p class="card-text">Un perro sin ejercicio tiene energía de sobra, y salir sólo para usar el baño no es
                    suficiente</p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card">
                <img src="/sociabilizarmascota.jpg" class="card-img-top" alt="Sociabilización" width="150px"
                  height="150px">
                <div class="card-body">
                  <h5 class="card-title">Sociabilización</h5>
                  <p class="card-text">Muchos problemas de conducta y salud de los perros se deben a que pasan muchas
                    horas en soledad.</p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card">
                <img src="/rutinamascota.png" class="card-img-top" alt="Rutina" width="150px" height="150px">
                <div class="card-body">
                  <h5 class="card-title">Rutina</h5>
                  <p class="card-text">Mantener una rutina diaria significa mejor comportamiento y mayor inteligencia para
                    tu perro.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div v-if="user.role === 'PASEADOR' || user.role === 'CLIENTE'" class="container">
    <div id="servicios" class="claseServ mt-4">
      <h2 style="text-align: center; color: black;">SERVICIOS</h2>
      <p style="text-align: center; color: black;" v-if="user.role === 'PASEADOR'">COMO PASEADOR PODRAS DISFRUTAR DE LOS
        SIGUENTES SERVICIOS</p>
      <p style="text-align: center; color: black;" v-if="user.role === 'CLIENTE'">COMO CLIENTE PODRAS DISFRUTAR DE LOS
        SIGUENTES SERVICIOS</p>
      <div class="row">
        <!-- Paseos programados -->
        <div class="col-sm-6 mb-3 mb-sm-10">
          <div class="card text-center">
            <div class="card-body">
              <img src="/iconopaseoperro.png" class="card-img-top" alt="Paseos programados"
                style="width: auto; height: 50px;">
              <h5 class="card-title">Paseos programados</h5>
              <p class="card-text" style="font-style: italic;">Podrás ver los paseos programados</p>
              <router-link to="/paseosProgramados" class="btn btn-primary">Visitar</router-link>
            </div>
          </div>
        </div>
        <!-- Historial de Paseos -->
        <div class="col-sm-6 mb-3 mb-sm-10">
          <div class="card text-center">
            <div class="card-body">
              <img src="/iconohistorial.png" class="card-img-top" alt="Historial de Paseos"
                style="width: auto; height: 50px;">
              <h5 class="card-title">Historial de Paseos</h5>
              <p class="card-text" style="font-style: italic;">Ver tu historial de paseos realizados</p>
              <router-link to="/historialPaseos" class="btn btn-primary">Visitar</router-link>
            </div>
          </div>
        </div>
        <!-- Mis Datos -->
        <div class="col-sm-6 mb-3 mb-sm-10">
          <div class="card text-center">
            <div class="card-body">
              <img src="/iconoperfil.png" class="card-img-top" alt="Mis Datos" style="width: auto; height: 50px;">
              <h5 class="card-title">Mis Datos</h5>
              <p class="card-text" style="font-style: italic;">Podrás ver o modificar tus datos personales</p>
              <router-link to="/user" class="btn btn-primary">Visitar</router-link>
            </div>
          </div>
        </div>

        <!-- Modificar tu horario y zona Paseador-->
        <div class="col-sm-6 mb-3 mb-sm-10" v-if="user.role === 'PASEADOR'">
          <div class="card text-center">
            <div class="card-body">
              <img src="/iconozonahorario.png" class="card-img-top" alt="Modificar tu horario y zona"
                style="width: auto; height: 50px;">
              <h5 class="card-title">Modificar tu horario y zona</h5>
              <p class="card-text" style="font-style: italic;">Podrás modificar tu disponibilidad y cargar tus zonas y
                horarios preferentes</p>
              <router-link to="/disponibilidadPaseador" class="btn btn-primary">Visitar</router-link>
            </div>
          </div>
        </div>
        <!-- Mascotas Cliente-->
        <div class="col-sm-6 mb-3 mb-sm-10" v-if="user.role === 'CLIENTE'">
          <div class="card text-center">
            <div class="card-body">
              <img src="/iconomascotas.png" class="card-img-top" alt="Mis Datos" style="width: auto; height: 50px;">
              <h5 class="card-title">Mis Mascotas</h5>
              <p class="card-text" style="font-style: italic;">Podrás ver y modificar tus Mascotas</p>
              <router-link to="/mascotas" class="btn btn-primary">Visitar</router-link>
            </div>
          </div>
        </div>
        <!-- Contratar Paseador -->
        <div class="col-sm-6 mb-3 mb-sm-10" v-if="user.role === 'CLIENTE'">
          <div class="card text-center">
            <div class="card-body">
              <img src="/iconocontratar.png" class="card-img-top" alt="Mis Datos" style="width: auto; height: 50px;">
              <h5 class="card-title">Contratar Paseador</h5>
              <p class="card-text" style="font-style: italic;">Podrás buscar y elegir el paseador que deseas contratar</p>
              <router-link to="/busquedaPaseadores" class="btn btn-primary">Visitar</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.carousel-caption h5 {
  font-family: 'Urbanist', sans-serif;
  font-weight: bold;
  font-size: 40px;
  color: white;
  background-color: rgb(139, 0, 139, 40%);
  margin-bottom: 0px;
}

.carousel-caption p {
  font-family: 'Urbanist', sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: white;
  background-color: rgb(139, 0, 139, 40%);
}

@media screen and (min-width: 1280px) {
  .carousel-item {
    height: 85vh;
  }
}



.card {
  margin-bottom: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      carouselItems: [
        {
          image: "/Portada Paseando.png",
          title: "PERREANDO",
          text: "¿Quieres pasear o contratar un paseador? ¡Estás en el sitio indicado! Ofrecemos un servicio de calidad para que puedas disfrutar de paseos divertidos y seguros para tu perro."
        },
        {
          image: "/paseadoresperros.jpg",
          title: "NUESTROS PASEADORES",
          text: "Contamos con una amplia cantidad de paseadores en distintas zonas y horarios. ¡Únete a nosotros y forma parte de nuestro equipo de paseadores!"
        },
        {
          image: "/perro.jpg",
          title: "MASCOTAS",
          text: "En nuestra plataforma, nos preocupamos por el bienestar y la felicidad de tus queridas mascotas. Contamos con paseadores profesionales y amantes de los animales que se encargarán de brindarles el cuidado y atención que merecen. Regístrate ahora y disfruta de la tranquilidad de saber que tus mascotas están en buenas manos."
        }
      ]
    };
  }
};
</script>

