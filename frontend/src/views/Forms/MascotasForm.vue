
<template>
  <div class="container">
    <h2 class="mb-4">Formulario de Mascota</h2>

    <form @submit="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="formData.name" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="ownerId">ID del Propietario:</label>
        <input type="text" id="ownerId" v-model="formData.ownerId" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="vaccinated">Vacunado:</label>
        <input type="checkbox" id="vaccinated" v-model="formData.vaccinated" class="form-check">
      </div>

      <div class="form-group">
        <label for="size">Tamaño:</label>
        <select id="size" v-model="formData.size" required class="form-select">
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="big">Grande</option>
        </select>
      </div>

      <div class="form-group">
        <label for="breed">Raza:</label>
        <input type="text" id="breed" v-model="formData.breed" required class="form-control">
      </div>

      <div class="form-group">
        <label for="weight">Peso:</label>
        <input type="text" id="weight" v-model="formData.weight" required class="form-control">
      </div>

      <button type="submit" class="btn btn-primary mt-4">Guardar</button>
      
      
      <div class="alert alert-danger mt-4" role="alert" v-if="msg">
        {{msg}}
      </div>
      
    </form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
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
    
    
    const state = reactive({
      msg: ''
    });

    const isValidMascota = (mascotaData) => {
      //TODO: validar que los datos de la mascota sean validos.
      return true; 
    }

    const submitForm = (event) => {
      event.preventDefault();
      const mascotaData = {
        ...formData.value
      }
     
      state.msg = "loading..."; //TODO: improve this message later.
 
      if(isValidMascota(mascotaData)){
        MascotasService.create(mascotaData).then(()=>{
          state.msg = "La mascota ha sido agregada exitosamente."
        }).catch((err)=>{
          state.msg = "Se produjo un error al intentar guardar la mascota."
        })
      } else {
        state.msg = "Los datos introducidos para la mascota son invalidos."
      }
    };

    return {
      formData,
      submitForm
    };
  }
};
</script>
