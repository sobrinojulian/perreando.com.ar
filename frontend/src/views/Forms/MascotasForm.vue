
<template>
  <div>
    <h1>Formulario de Mascota</h1>

    <form @submit="submitForm">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>

      <div>
        <label for="ownerId">ID del Propietario:</label>
        <input type="text" id="ownerId" v-model="formData.ownerId" required>
      </div>

      <div>
        <label for="vaccinated">Vacunado:</label>
        <input type="checkbox" id="vaccinated" v-model="formData.vaccinated">
      </div>

      <div>
        <label for="size">Tamaño:</label>
        <select id="size" v-model="formData.size" required>
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="big">Grande</option>
        </select>
      </div>

      <div>
        <label for="breed">Raza:</label>
        <input type="text" id="breed" v-model="formData.breed" required>
      </div>

      <div>
        <label for="weight">Peso:</label>
        <input type="text" id="weight" v-model="formData.weight" required>
      </div>

      <button type="submit">Guardar</button>
    </form>

    <div v-if="isSubmitted">
      <h2>Información de la Mascota:</h2>
      <p><strong>Nombre:</strong> {{ formData.name }}</p>
      <p><strong>ID del Propietario:</strong> {{ formData.ownerId }}</p>
      <p><strong>Vacunado:</strong> {{ formData.vaccinated ? 'Sí' : 'No' }}</p>
      <p><strong>Tamaño:</strong> {{ formData.size }}</p>
      <p><strong>Raza:</strong> {{ formData.breed }}</p>
      <p><strong>Peso:</strong> {{ formData.weight }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import MascotasService from "../../services/mascotas-service";

export default {
  setup() {
    const formData = ref({
      name: 'Teddy',
      ownerId: '0',
      vaccinated: true,
      size: 'big',
      breed: 'pastor aleman',
      weight: '19kg'
    });

    const isSubmitted = ref(false);

    const isValidMascota = (mascotaData) => {
      //TODO: validar que los datos de la mascota sean validos.
      return true; 
    }

    const submitForm = (event) => {
      event.preventDefault();
      isSubmitted.value = true;
      const mascotaData = {
        ...formData.value
      }
      if(isValidMascota(mascotaData)){
        MascotasService.create(mascotaData)
      } else {
         //TODO: mostrar msj de error en el formulario.
      }
    };

    return {
      formData,
      isSubmitted,
      submitForm
    };
  }
};
</script>
