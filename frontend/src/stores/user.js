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
          {
            label: 'Alta de Disponibilidad Paseos',
            to: '/disponibilidadPaseador'
          },
          { label: 'Logout', to: '/', action: 'logout' }
        ]
      }
    }
  },
  actions: {
    updateUser(user) {
      this.user = user
    },
    update(response) {
      this.user.username = response.data.username
      this.user.email = response.data.email
      this.user.password = response.data.password
      this.user.nombre = response.data.nombre
      this.user.apellido = response.data.apellido
      this.user.dni = response.data.dni
      this.user.fechaNacimiento = response.data.fechaNacimiento
      this.user.telefono = response.data.telefono
      this.user.direccion = response.data.direccion
      this.user.role = response.data.role
      this.user.saldo = response.data.saldo
    },
    logout() {
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
      this.user.nombre = ''
      this.user.apellido = ''
      this.user.dni = ''
      this.user.fechaNacimiento = ''
      this.user.telefono = ''
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
