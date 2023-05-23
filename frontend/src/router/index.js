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

    //Rutas de Usuario
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/editUser',
      name: 'editUser',
      component: () => import('../views/EditUserView.vue')
    },
    {
      path: '/deleteUser',
      name: 'deleteUser',
      component: () => import('../views/DeleteUserView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: () => import('../views/RegistrarView.vue')
    },

    {
      path: '/paseosProgramados',
      name: 'paseosProgramados',
      component: () => import('../views/PaseosProgramadosView.vue')
    },
    {
      path: '/historialPaseos',
      name: 'historialPaseos',
      component: () => import('../views/HistorialPaseosView.vue')
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
    },
    {
      path: '/busquedaPaseadores',
      name: 'busquedaPaseadores',
      component: () => import('../views/BusquedaPaseadoresView.vue')
    },
    {
      path: '/contratarPaseadores',
      name: 'contratarPaseadores',
      component: () => import('../views/ContratarPaseadoresView.vue')
    },
    {
      path: '/horariosPaseador',
      name: 'horariosPaseador',
      component: () => import('../views/HorariosPaseadorView.vue')
    },
    {
      path: '/zonasPaseador',
      name: 'zonasPaseador',
      component: () => import('../views/ZonasPaseadorView.vue')
    }
  ]
})

export default router
