import express from 'express'
import UserController from '../controllers/usersController.js'

class RouterUser {

    constructor(){
        this.router = express.Router()
        this.controller = new UserController()
    }

    start(){
        // ---- Metodos ----
        this.router.get('/login/:username/:password', this.controller.loguearUsuario)
        this.router.post('/register', this.controller.registrarUsuario)
        this.router.put('/edit', this.controller.actualizarUsuario)
        this.router.delete('/delete/:username', this.controller.eliminarUsuario)

        // API REST FULL
        // this.router.get('/:username?', this.controller.obtenerUsuarios)
        // this.router.post('/', this.controller.guardarUsuario)
        // this.router.put('/:username', this.controller.actualizarUsuario)
        // this.router.delete('/:username', this.controller.eliminarUsuario)
        // -----------------

        return this.router
    }

}

export default RouterUser