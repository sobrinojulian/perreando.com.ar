import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        id: '',
        username: '',
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: '',
        telefono: '',
        direccion: '',
        role: '',
        saldo: 0
      },
      menus: {
        ANONIMO: [
          { label: 'Login', to: '/login' },
          { label: 'Registrar', to: '/registrar' }
        ],
        CLIENTE: [
          { label: 'Información Usuario', to: '/user' },
          { label: 'Paseos Programados', to: '/paseosProgramados' },
          { label: 'Historial de Paseos', to: '/historialPaseos' },
          { label: 'Mascotas', to: '/mascotas' },
          { label: 'Contratar Paseadores', to: '/busquedaPaseadores' },
          { label: 'Logout', to: '/', action: 'logout' }
        ],
        PASEADOR: [
          { label: 'Información Usuario', to: '/user' },
          { label: 'Paseos Programados', to: '/paseosProgramados' },
          { label: 'Historial de Paseos', to: '/historialPaseos' },
          { label: 'Alta de Disponibilidad Paseos', to: '/disponibilidadPaseador' },
          { label: 'Logout', to: '/', action: 'logout' }
        ]
      }
    }
  },
  actions: {
    updateUser(user) {
      this.user = user
    },
    logout() {
      this.user.username = ''
      this.user.role = ''
    },
    esAnonimo() {
      return this.user.username === ''
    },
    esPaseador() {
      return this.user.role === 'PASEADOR'
    },
    esCliente() {
      return this.user.role === 'CLIENTE'
    },
    getMenuItems() {
      const role = this.user.role || 'ANONIMO'
      return this.menus[role] || []
    }
  }
})
