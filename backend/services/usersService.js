import UserModel from '../model/DAOs/usersModel.js'
import UserValidate from '../validations/users.js'

class ServiceUser {
  constructor() {
    this.modelUser = new UserModel()
    this.validateUser = new UserValidate()
  }

  loguearUsuario = async (username, password) => {
    try {
      let mensajeError = ''
      const userLogin = await this.modelUser.obtenerUsuarioByUsername(username)

      //Valido que exista el nombre de usuario ingresado
      if (userLogin != null) {
        //Valido que coincidan el nombre de usuario y la constraseña
        if (
          userLogin.username === username &&
          userLogin.password === password
        ) {
          return { ...userLogin, ...{ respuesta: true } }
        } else {
          mensajeError = 'La constraseña ingresada es incorrecta.'
          console.log(mensajeError)
          return { respuesta: false, error: mensajeError }
        }
      } else {
        mensajeError = 'El nombre de usuario ingresado no existe.'
        console.log(mensajeError)
        return { respuesta: false, error: mensajeError }
      }
    } catch (error) {
      console.log('Error en ServiceUser.loguearUsuario() --> ', error)
      return {}
    }
  }

  registrarUsuario = async user => {
    try {
      let mensajeError = ''
      const validate = this.validateUser.validarUser(user)

      if (validate.respuesta) {
        const userRegistered = await this.modelUser.guardarUsuario(user)
        return { ...userRegistered, ...validate }
      } else {
        mensajeError =
          'Error al registrar el usuario, valide los datos ingresados.'
        console.log(mensajeError)
        return { respuesta: validate.respuesta, error: mensajeError }
      }
    } catch (error) {
      console.log('Error en ServiceUser.registrarUsuario() --> ', error)
      return {}
    }
  }

  actualizarUsuario = async (id, user) => {
    try {
      let mensajeError = ''
      const validate = this.validateUser.validarUser(user)

      if (validate.respuesta) {
        const userUpdated = await this.modelUser.actualizarUsuario(id, user)
        return { ...userUpdated, ...validate }
      } else {
        mensajeError =
          'Error al actualizar el usuario, valide los datos ingresados.'
        console.log(mensajeError)
        return { respuesta: validate.respuesta, error: mensajeError }
      }
    } catch (error) {
      console.log('Error en ServiceUser.actualizarUsuario() --> ', error)
      return {}
    }
  }

  eliminarUsuario = async id => {
    try {
      const userDeleted = await this.modelUser.eliminarUsuario(id)
      return userDeleted
    } catch (error) {
      console.log('Error en ServiceUser.eliminarUsuario() --> ', error)
      return {}
    }
  }
}

export default ServiceUser
