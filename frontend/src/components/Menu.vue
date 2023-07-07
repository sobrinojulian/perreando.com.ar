<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user.js";

import MenuAnonimo from "./MenuAnonimo.vue";
import MenuCliente from "./MenuCliente.vue";
import MenuPaseador from "./MenuPaseador.vue";

const userStore = useUserStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <img
          src="/perrando-logo-horizontal-blanco.png"
          alt="Perreando Logo"
          height="28"
        />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <MenuAnonimo v-show="userStore.esAnonimo()" />
        <MenuCliente v-show="userStore.esCliente()" />
        <MenuPaseador v-show="userStore.esPaseador()" />
      </div>
    </div>
  </nav>
</template>
