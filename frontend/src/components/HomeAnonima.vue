<script setup>
const carouselItems = [
  {
    image: '/Portada Paseando.png',
    title: 'PERREANDO',
    text: '¿Quieres pasear o contratar un paseador? ¡Estás en el sitio indicado! Ofrecemos un servicio de calidad para que puedas disfrutar de paseos divertidos y seguros para tu perro.'
  },
  {
    image: '/paseadoresperros.jpg',
    title: 'NUESTROS PASEADORES',
    text: 'Contamos con una amplia cantidad de paseadores en distintas zonas y horarios. ¡Únete a nosotros y forma parte de nuestro equipo de paseadores!'
  },
  {
    image: '/perro.jpg',
    title: 'MASCOTAS',
    text: 'En nuestra plataforma, nos preocupamos por el bienestar y la felicidad de tus queridas mascotas. Contamos con paseadores profesionales y amantes de los animales que se encargarán de brindarles el cuidado y atención que merecen. Regístrate ahora y disfruta de la tranquilidad de saber que tus mascotas están en buenas manos.'
  }
]
</script>

<template>
  <div>
    <div id="carouselPortada" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselPortada"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"></button>
        <button
          type="button"
          data-bs-target="#carouselPortada"
          data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button
          type="button"
          data-bs-target="#carouselPortada"
          data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]">
          <img
            :src="item.image"
            class="d-block w-100"
            :alt="'Slide ' + (index + 1)" />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ item.title }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselPortada"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselPortada"
        data-bs-slide="next">
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
          <p>
            El paseo diario es una actividad fundamental para la calidad de vida
            de tu perro
          </p>

          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <img
                  src="/ejerciciomascota.jpg"
                  class="card-img-top"
                  alt="Ejercicio"
                  width="150px"
                  height="150px" />
                <div class="card-body">
                  <h5 class="card-title">Ejercicio</h5>
                  <p class="card-text">
                    Un perro sin ejercicio tiene energía de sobra, y salir sólo
                    para usar el baño no es suficiente
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card">
                <img
                  src="/sociabilizarmascota.jpg"
                  class="card-img-top"
                  alt="Sociabilización"
                  width="150px"
                  height="150px" />
                <div class="card-body">
                  <h5 class="card-title">Sociabilización</h5>
                  <p class="card-text">
                    Muchos problemas de conducta y salud de los perros se deben
                    a que pasan muchas horas en soledad.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card">
                <img
                  src="/rutinamascota.png"
                  class="card-img-top"
                  alt="Rutina"
                  width="150px"
                  height="150px" />
                <div class="card-body">
                  <h5 class="card-title">Rutina</h5>
                  <p class="card-text">
                    Mantener una rutina diaria significa mejor comportamiento y
                    mayor inteligencia para tu perro.
                  </p>
                </div>
              </div>
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
