import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/mascotas',
      name: 'mascotas',
      component: () => import('../views/MascotasView.vue')
    },
    {
      path: '/mascotas/add',
      name: 'add',
      component: () => import('../views/AddMascotasView.vue')
    }
  ]
})

export default router
