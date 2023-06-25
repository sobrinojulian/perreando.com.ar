import express from 'express'
import DisponibilidadController from '../controllers/disponibilidadesController.js'

class DisponibilidadRouter {
  constructor() {
    this.router = express.Router()
    this.controller = new DisponibilidadController()
  }

  start() {
    // ---- Metodos ----
    this.router.get(
      '/:paseadorId',
      this.controller.obtenerDisponibilidadesByPaseador
    )
    this.router.get('/:zona?/:horario?', this.controller.filtrarPaseadores)
    this.router.delete('/delete/:id', this.controller.eliminarDisponibilidad)
    this.router.post('/cargar', this.controller.cargarDisponibilidades)

    return this.router
  }
}

export default DisponibilidadRouter
