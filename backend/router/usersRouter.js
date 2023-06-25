import express from 'express'
import UserController from '../controllers/usersController.js'

class RouterUser {
  constructor() {
    this.router = express.Router()
    this.controller = new UserController()
  }

  start() {
    this.router.get(
      '/login/:username/:password',
      this.controller.loguearUsuario
    )
    this.router.post('/register', this.controller.registrarUsuario)
    this.router.put('/edit/:id', this.controller.actualizarUsuario)
    this.router.delete('/delete/:id', this.controller.eliminarUsuario)
    this.router.get('/verify/:verificationToken', this.controller.verificarEmailUsuario)

    return this.router
  }
}

export default RouterUser
