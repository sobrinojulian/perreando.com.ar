import express from 'express'
import MascotaController from '../controllers/mascotasController.js'

class MascotaRouter {
  constructor() {
    this.router = express.Router()
    this.controller = new MascotaController()
  }

  start() {
    // ---- Metodos ----
    this.router.get('/:ownerId', this.controller.obtenerMascotasByOwner)
    this.router.get('/:id', this.controller.obtenerMascotasById)
    this.router.get('/', this.controller.obtenerMascotas)
    this.router.post('/', this.controller.guardarMascota)
    this.router.put('/:id', this.controller.actualizarMascota)
    this.router.delete('/:id', this.controller.eliminarMascota)

    return this.router
  }
}

export default MascotaRouter
