<script>
import { ref } from "vue";
import MascotasService from "../../services/mascotaService";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import ModalView from "./ModalView.vue";
import { Field, Form, ErrorMessage } from "vee-validate";

export default {
  components: {
    ModalView,
    Field,
    Form,
    ErrorMessage,
  },
  methods: {},
  setup() {
    const storeUser = useUserStore();
    const storeRef = storeToRefs(storeUser);
    const user = storeRef.user.value;
    const mascotasList = ref([]);
    const mascotasListStatus = ref({
      msg: "",
      error: false,
      loading: false,
    });

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

    const modalStatus = ref({
      open: false,
      id: -1,
    });

    const editionMode = ref({
      active: false,
      id: -1,
    });

    const getMascotas = () => {
      mascotasListStatus.value.loading = true;

      MascotasService.obtenerMascotasByOwner(user.id)
        .then((mascotasListResponse) => {
          mascotasListStatus.value.msg = "";
          mascotasListStatus.value.error = false;
          mascotasList.value = mascotasListResponse.data;
          // if(mascotasListResponse.data.lenth > 0){
          //   mascotasList.value = mascotasListResponse.filter((pet)=>{
          //     return pet.ownerId == user.dni;
          //   })
          // }
          //console.log("mascotas list response", mascotasListResponse)
        })
        .catch((err) => {
          mascotasListStatus.value.msg =
            "Se produjo un error al intentar obtener el listado de mascotas.";
          mascotasListStatus.value.error = true;
        })
        .finally(() => {
          mascotasListStatus.value.loading = false;
        });
    };

    function onDelete(id) {
      MascotasService.eliminarMascota(id)
        .then(() => {
          const mascotaIndex = mascotasList.value.findIndex((mascota) => {
            return mascota._id == id;
          });
          if (mascotaIndex !== -1) {
            const mascotasListCopy = [...mascotasList.value];
            mascotasListCopy.splice(mascotaIndex, 1);
            mascotasList.value = mascotasListCopy;
          }
        })
        .catch((err) => {
          mascotasListStatus.value.msg =
            "Se produjo un error al intentar obtener el listado de mascotas.";
          mascotasListStatus.value.error = true;
        })
        .finally(() => {
          modalStatus.value.open = false;
          modalStatus.value.id = -1;
        });
    }

    function onModalClose() {
      modalStatus.value.open = false;
    }

    function askForDeletion(mascotaId) {
      modalStatus.value.open = true;
      modalStatus.value.id = mascotaId;
    }

    function editMascota(mascotaId, index) {
      editionMode.value.active = true;
      editionMode.value.id = mascotaId;
      formData.value.data = { ...mascotasList.value[index] };
    }

    function cancelEditMascota(mascotaId) {
      editionMode.value.active = false;
      editionMode.value.id = -1;
    }

    function submitForm() {
      //const mascota = {...formData.value.data, id: editionMode.value.id};
      const mascota = formData.value.data;
      console.log("Submited!", mascota);

      MascotasService.actualizarMascota(mascota._id, mascota)
        .then((response) => {
          if (response.data.respuesta) {
            const index = mascotasList.value.findIndex(
              (mascota) => mascota._id == editionMode.value.id,
            );
            if (index !== -1) {
              mascotasList.value[index] = mascota;
              editionMode.value.active = false;
              editionMode.value.id = -1;
            }
          } else {
            formData.value.status.msg = response.data.error;
            formData.value.status.error = true;
          }
        })
        .catch((err) => {
          mascotasListStatus.value.msg =
            "Se produjo un error al intentar actualizar la informacion de la mascota.";
          mascotasListStatus.value.error = true;
        });
    }

    getMascotas();

    return {
      mascotasList,
      mascotasListStatus,
      onDelete,
      modalStatus,
      editionMode,
      onModalClose,
      askForDeletion,
      formData,
      editMascota,
      submitForm,
      cancelEditMascota,
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Mis Mascotas</h2>
    <Form @submit="submitForm" v-slot="{ errors }">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Raza</th>
            <th scope="col">Peso</th>
            <th scope="col">Vacunado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mascota, index) in mascotasList" :key="mascota._id">
            <td>
              <div
                class="form-group"
                v-if="editionMode.id == mascota._id && editionMode.active"
              >
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
              <p v-if="editionMode.id != mascota._id">{{ mascota.name }}</p>
            </td>
            <td>
              <div
                class="form-group"
                v-if="editionMode.id == mascota._id && editionMode.active"
              >
                <Field
                  name="breed"
                  type="text"
                  id="breed"
                  v-model="formData.data.breed"
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
              <p v-if="editionMode.id != mascota._id">{{ mascota.breed }}</p>
            </td>
            <td>
              <div
                class="form-group"
                v-if="editionMode.id == mascota._id && editionMode.active"
              >
                <Field
                  name="weight"
                  type="text"
                  id="weight"
                  v-model="formData.data.weight"
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
              <p v-if="editionMode.id != mascota._id">{{ mascota.weight }}</p>
            </td>
            <td>
              <p v-if="editionMode.id != mascota._id">
                {{ mascota.vaccinated ? "Si" : "No" }}
              </p>
              <input
                v-if="editionMode.id == mascota._id"
                name="vaccinated"
                type="checkbox"
                id="vaccinated"
                v-model="formData.data.vaccinated"
                class="form-check"
              />
            </td>
            <td>
              <button
                @click="askForDeletion(mascota._id)"
                class="btn btn-danger me-2"
              >
                Eliminar
              </button>
              <button
                v-if="!editionMode.active"
                @click="editMascota(mascota._id, index)"
                class="btn btn-primary me-2"
              >
                Editar
              </button>
              <button
                v-if="editionMode.id == mascota._id && editionMode.active"
                @click="cancelEditMascota(mascota._id, index)"
                class="btn btn-primary me-2"
              >
                Cancelar
              </button>
              <button
                v-if="editionMode.id == mascota._id && editionMode.active"
                type="submit"
                class="btn btn-primary me-2"
              >
                Salvar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
    <div
      class="alert mt-4"
      :class="{
        'alert-warning': mascotasListStatus.loading,
        'alert-danger': mascotasListStatus.error,
        'alert-success':
          !mascotasListStatus.error && !mascotasListStatus.loading,
      }"
      role="alert"
      v-if="mascotasListStatus.msg"
    >
      <p>{{ mascotasListStatus.msg }}</p>
    </div>
    <modal-view :open="modalStatus.open" :onClose="onModalClose">
      <template v-slot:title> Eliminar </template>

      <template v-slot:body>
        <p>¿Está seguro que desea eliminar la mascota?</p>
      </template>

      <template v-slot:controls>
        <button
          @click="onDelete(modalStatus.id)"
          type="button"
          class="btn btn-primary"
        >
          Aceptar
        </button>
        <button
          @click="onModalClose"
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancelar
        </button>
      </template>
    </modal-view>
    <!-- <pre> {{ mascotasList }} </pre> -->

    <RouterLink class="navbar-brand" to="/mascotas/add">
      <button class="btn btn-primary mb-4">Agregar</button>
    </RouterLink>
  </div>
</template>
