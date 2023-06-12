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

    //----- Vistas de Usuario -----
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/UserViews/LoginView.vue')
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: () => import('../views/UserViews/RegistrarView.vue')
    },
    {
      path: '/user',
      name: 'informacionUser',
      component: () => import('../views/UserViews/InformacionUserView.vue')
    },
    {
      path: '/editUser',
      name: 'editUser',
      component: () => import('../views/UserViews/EditUserView.vue')
    },
    {
      path: '/deleteUser',
      name: 'deleteUser',
      component: () => import('../views/UserViews/DeleteUserView.vue')
    },
    //-----------------------------

    //----- Vistas de Mascota -----    
    {
      path: '/mascotas',
      name: 'mascotas',
      component: () => import('../views/MascotaViews/MascotasView.vue')
    },
    {
      path: '/mascotas/add',
      name: 'add',
      component: () => import('../views/MascotaViews/AddMascotasView.vue')
    },
    //-----------------------------

    //----- Vistas de Reportes -----
    {
      path: '/paseosProgramados',
      name: 'paseosProgramados',
      component: () => import('../views/ResportesViews/PaseosProgramadosView.vue')
    },
    {
      path: '/historialPaseos',
      name: 'historialPaseos',
      component: () => import('../views/ResportesViews/HistorialPaseosView.vue')
    },
    //-----------------------------

    //----- Vistas de Disponibilidad Paseador -----
    {
      path: '/disponibilidadPaseador',
      name: 'disponibilidadPaseador',
      component: () => import('../views/DisponibilidadPaseadorViews/DisponibilidadPaseadorView.vue')
    },
    {
      path: '/addDisponibilidades',
      name: 'addDisponibilidades',
      component: () => import('../views/DisponibilidadPaseadorViews/CargarDisposPaseadorView.vue')
    },
    //-----------------------------

    //----- Vistas de Contratacion -----
    {
      path: '/busquedaPaseadores',
      name: 'busquedaPaseadores',
      component: () => import('../views/ContratarPaseoViews/BusquedaPaseadoresView.vue')
    },
    {
      path: '/contratarPaseador',
      name: 'contratarPaseador',
      component: () => import('../views/ContratarPaseoViews/ContratarPaseadorView.vue')
    }
  ]
})

export default router
