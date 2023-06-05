import express from 'express'
import PaseadorController from '../controllers/paseadoresController.js'

class PaseadorRouter {

    constructor(){
        this.router = express.Router()
        this.controller = new PaseadorController()
    }

    start(){
        // ---- Metodos ----
        this.router.get('/:id', this.controller.obtenerPaseadorDisponibilidades)
        this.router.get('/:zona?/:horario?', this.controller.filtrarPaseadores)
        this.router.delete('/delete/:id', this.controller.eliminarDisponibilidad)
        this.router.post('/cargar', this.controller.cargarDisponibilidades)

        return this.router
    }

}

export default PaseadorRouter