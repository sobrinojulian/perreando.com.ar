<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()

function handleMenuItemClick(item) {
  if (item.action === 'logout') {
    userStore.logout()
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <img
          src="/perrando-logo-horizontal-blanco.png"
          alt="Perreando Logo"
          height="28" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li
            class="nav-item"
            v-for="item in userStore.getMenuItems()"
            :key="item.label">
            <RouterLink
              :to="item.to"
              class="nav-link"
              @click="handleMenuItemClick(item)">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
