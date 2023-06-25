import express from 'express'
import PaseoController from '../controllers/paseosController.js'

class PaseoRouter {
  constructor() {
    this.router = express.Router()
    this.controller = new PaseoController()
  }

  start() {
    // ---- Metodos ----
    this.router.post('/', this.controller.guardarPaseo)
    this.router.get(
      '/programados/:role/:id',
      this.controller.obtenerPaseosProgramados
    )
    this.router.get(
      '/historial/:role/:id',
      this.controller.obtenerPaseosHistorial
    )

    return this.router
  }
}

export default PaseoRouter
