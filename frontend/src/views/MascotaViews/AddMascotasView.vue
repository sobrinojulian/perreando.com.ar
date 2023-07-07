<script>
import MascotasForm from "./Forms/MascotasForm.vue";

export default {
  components: {
    MascotasForm,
  },
};
</script>

<template>
  <div class="container mb-4">
    <MascotasForm />
    <div class="container mb-4">
      <hr />
      <RouterLink class="navbar-brand" to="/mascotas">
        <button class="btn btn-primary mb-4">Volver</button>
      </RouterLink>
    </div>
  </div>
</template>
