<script>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'

export default {
  components: {
    RouterLink
  },
  methods: {
    logout() {
      const store = useUserStore();
      store.user.username = '';
      store.user.role = '';
    }
  }
}
</script>
<template>
  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <RouterLink to="/paseosProgramados" class="nav-link">
        Paseos Programados
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/historialPaseos" class="nav-link">
        Historial de Paseos
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/user" class="nav-link">
        Información Usuario
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/disponibilidadPaseador" class="nav-link">
        Alta de Disponibilidad Paseos
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/" class="nav-link" @click="logout">
        Logout
      </RouterLink>
    </li>
  </ul>
</template>