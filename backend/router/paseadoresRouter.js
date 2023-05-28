import express from 'express'
import PaseadorController from '../controllers/paseadoresController.js'

class PaseadorRouter {

    constructor(){
        this.router = express.Router()
        this.controller = new PaseadorController()
    }

    start(){
        // ---- Metodos ----
        this.router.get('/:zona/:horario', this.controller.filtrarPaseadores)

        return this.router
    }

}

export default PaseadorRouter