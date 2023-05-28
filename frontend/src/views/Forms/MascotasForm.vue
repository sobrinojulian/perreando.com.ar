
<template>
  <div class="container">
    <h2 class="mb-4">Formulario de Mascota</h2>

    <form @submit="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="formData.data.name" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="ownerId">ID del Propietario:</label>
        <input type="text" id="ownerId" v-model="formData.data.ownerId" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="vaccinated">Vacunado:</label>
        <input type="checkbox" id="vaccinated" v-model="formData.data.vaccinated" class="form-check">
      </div>

      <div class="form-group">
        <label for="size">Tamaño:</label>
        <select id="size" v-model="formData.data.size" required class="form-select">
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="big">Grande</option>
        </select>
      </div>

      <div class="form-group">
        <label for="breed">Raza:</label>
        <input type="text" id="breed" v-model="formData.data.breed" required class="form-control">
      </div>

      <div class="form-group">
        <label for="weight">Peso:</label>
        <input type="text" id="weight" v-model="formData.data.weight" required class="form-control">
      </div>

      <button type="submit" :disabled="formData.status.loading" class="btn btn-primary mt-4">Guardar</button>
      
      <div class="alert mt-4" 
      :class="{'alert-warning': formData.status.loading, 'alert-danger': formData.status.error, 'alert-success': !formData.status.error && !formData.status.loading}" 
      role="alert" v-if="formData.status.msg">
        <p>{{formData.status.msg}}</p>
      </div>
      
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import MascotasService from "../../services/mascotas-service";

export default {
  setup() {
    const formData = ref({
      data:{
        name: 'Teddy',
        ownerId: '0',
        vaccinated: true,
        size: 'big',
        breed: 'pastor aleman',
        weight: '19kg'
      },
      status: {
        loading: false,
        error: false,
        msg: ''
      }
    });
    

    const isValidMascota = (mascotaData) => {
      //TODO: validar que los datos de la mascota sean validos.
      return true; 
    }

    const submitForm = (event) => {
      event.preventDefault();
      const mascotaData = {
        ...formData.value.data
      }
      
      
      formData.value.status.msg = "loading..."; //TODO: improve this message later.
      formData.value.status.loading = true;
      
      if(isValidMascota(mascotaData)){
        MascotasService.create(mascotaData).then(()=>{
          formData.value.status.msg = "La mascota ha sido agregada exitosamente."
          formData.value.status.error = false;
        }).catch((err)=>{
          formData.value.status.msg = "Se produjo un error al intentar guardar la mascota."
          formData.value.status.error = true;
        }).finally(() => {
          formData.value.status.loading = false;
        })
      } else {
        formData.value.status.msg = "Los datos introducidos para la mascota son invalidos."
        formData.value.status.type = "alert-danger";
      }
    };

    return {
      formData,
      submitForm
    };
  }
};
</script>
