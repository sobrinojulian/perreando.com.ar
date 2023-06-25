import UserService from '../services/usersService.js'

class ControllerUser {
  constructor() {
    this.serviceUser = new UserService()
  }

  loguearUsuario = async (req, res) => {
    try {
      const username = req.params.username
      const password = req.params.password
      const userLogin = await this.serviceUser.loguearUsuario(
        username,
        password
      )

      res.json(userLogin)
    } catch (error) {
      console.log('Error en ControllerUser.loguearUsuario() --> ', error)
    }
  }

  registrarUsuario = async (req, res) => {
    try {
      const user = req.body
      const userRegistered = await this.serviceUser.registrarUsuario(user)

      res.json(userRegistered)
    } catch (error) {
      console.log('Error en ControllerUser.registrarUsuario() --> ', error)
    }
  }

  actualizarUsuario = async (req, res) => {
    try {
      const id = req.params.id
      const user = req.body
      const userUpdated = await this.serviceUser.actualizarUsuario(id, user)

      res.json(userUpdated)
    } catch (error) {
      console.log('Error en ControllerUser.actualizarUsuario() --> ', error)
    }
  }

  eliminarUsuario = async (req, res) => {
    try {
      const id = req.params.id
      const userDeleted = await this.serviceUser.eliminarUsuario(id)

      res.json(userDeleted)
    } catch (error) {
      console.log('Error en ControllerUser.eliminarUsuario() --> ', error)
    }
  }
}

export default ControllerUser
