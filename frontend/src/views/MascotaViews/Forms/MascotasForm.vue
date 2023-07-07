<template>
  <div class="container">
    <h2 class="mb-4">Formulario de Mascota</h2>

    <Form @submit="submitForm" v-slot="{ errors }">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <Field
          name="name"
          type="text"
          id="name"
          v-model="formData.data.name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          :rules="isRequired"
        />
        <ErrorMessage name="name" v-slot="{ message }">
          <div class="alert alert-danger">
            <span>{{ message }}</span>
          </div>
        </ErrorMessage>
      </div>

      <div class="form-group">
        <label for="vaccinated">Vacunado:</label>
        <input
          name="vaccinated"
          type="checkbox"
          id="vaccinated"
          v-model="formData.data.vaccinated"
          class="form-check"
        />
      </div>

      <div class="form-group">
        <label for="size">Tamaño:</label>
        <select
          id="size"
          v-model="formData.data.size"
          required
          class="form-select"
        >
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="big">Grande</option>
        </select>
      </div>

      <div class="form-group">
        <label for="breed">Raza:</label>
        <Field
          name="breed"
          type="text"
          id="breed"
          v-model="formData.data.breed"
          required
          class="form-control"
          :class="{ 'is-invalid': errors.breed }"
          :rules="isRequired"
        />
        <ErrorMessage name="breed" v-slot="{ message }">
          <div class="alert alert-danger">
            <span>{{ message }}</span>
          </div>
        </ErrorMessage>
      </div>

      <div class="form-group">
        <label for="weight">Peso:</label>
        <Field
          name="weight"
          type="text"
          id="weight"
          v-model="formData.data.weight"
          required
          class="form-control"
          :class="{ 'is-invalid': errors.weight }"
          :rules="isRequired"
        />
        <ErrorMessage name="weight" v-slot="{ message }">
          <div class="alert alert-danger">
            <span>{{ message }}</span>
          </div>
        </ErrorMessage>
      </div>

      <button
        type="submit"
        :disabled="formData.status.loading"
        class="btn btn-primary mt-4"
      >
        Guardar
      </button>

      <div
        class="alert mt-4"
        :class="{
          'alert-warning': formData.status.loading,
          'alert-danger': formData.status.error,
          'alert-success': !formData.status.error && !formData.status.loading,
        }"
        role="alert"
        v-if="formData.status.msg"
      >
        <p>{{ formData.status.msg }}</p>
      </div>
    </Form>
  </div>
</template>

<script>
import { ref } from "vue";
import MascotasService from "../../../services/mascotaService";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../../stores/user";
import { Field, Form, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const storeUser = useUserStore();
    const { user } = storeToRefs(storeUser);
    const formData = ref({
      data: {
        name: "Teddy",
        vaccinated: true,
        size: "big",
        breed: "pastor aleman",
        weight: "19kg",
      },
      status: {
        loading: false,
        error: false,
        msg: "",
      },
    });

    const isValidMascota = async (mascotaData) => {
      return true;
    };

    const submitForm = (event) => {
      //TODO: Leer el ownerId del usuario logueado cuando cargue la sesion.
      const mascotaData = {
        ...formData.value.data,
        //ownerId: user.value.dni
        ownerId: user.value.id,
      };

      formData.value.status.msg = "loading...";
      formData.value.status.loading = true;

      if (isValidMascota(mascotaData)) {
        console.log("mascota data:", mascotaData, formData.value.data);
        MascotasService.guardarMascota(mascotaData)
          .then((response) => {
            if (response.data.respuesta) {
              formData.value.status.msg =
                "La mascota ha sido agregada exitosamente.";
              formData.value.status.error = false;
            } else {
              formData.value.status.msg = response.data.error;
              formData.value.status.error = true;
            }
          })
          .catch((err) => {
            formData.value.status.msg =
              "Se produjo un error al intentar guardar la mascota.";
            formData.value.status.error = true;
          })
          .finally(() => {
            formData.value.status.loading = false;
          });
      } else {
        formData.value.status.msg =
          "Los datos introducidos para la mascota son invalidos.";
        formData.value.status.type = "alert-danger";
      }
    };

    return {
      formData,
      submitForm,
    };
  },
  methods: {
    isRequired(value) {
      if (value) {
        return true;
      }
      return "El campo es requerido.";
    },
    // isValidName(value){
    //   console.log("valor:", value, /([a-zA-Z ]){0,50}/.test(value));
    //   if(value && /([a-zA-Z ]){0,50}/.test(value)){
    //     return true;
    //   }
    //   return 'Debe ingresar un dato válido.';
    // },
  },
};
</script>
