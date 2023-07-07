<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import userService from "../../services/userService.js";

export default {
  setup() {
    const storeUser = useUserStore();
    const { user } = storeToRefs(storeUser);
    return {
      user,
    };
  },
  data() {
    return {
      vue: this,
      username: this.user.username,
      userBlank: {
        username: "",
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        telefono: "",
        role: "",
      },
    };
  },
  methods: {
    eliminar: (userBlank, vue) => {
      userService
        .deleteUser(vue.user.id)
        .then((response) => {
          vue.user = userBlank;
          alert("Usuario eliminado correctamente.");
          vue.$router.push("/login");
        })
        .catch((error) => {
          alert("Error: No se pudo eliminar su usuario.");
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Eliminar usuario</h2>
    <hr />

    <form @submit.prevent="eliminar(userBlank, vue)">
      <div class="form-group">
        <label for="username"
          >¿Esta seguro que desea eliminar su usuario <b>{{ username }}</b
          >?</label
        >
      </div>

      <br />
      <button type="submit" class="btn btn-primary" style="margin-right: 10px">
        Si
      </button>
      <RouterLink to="/user">
        <button class="btn btn-primary" style="margin-right: 10px">No</button>
      </RouterLink>
    </form>
  </div>
</template>
