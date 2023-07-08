import UserModel from '../model/DAOs/usersModel.js'
import UserValidate from '../validations/users.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import config from '../config.js'

class ServiceUser {
  constructor() {
    this.modelUser = new UserModel()
    this.validateUser = new UserValidate()
  }

  loguearUsuario = async (username, password) => {
    try {
      const userLogin = await this.modelUser.obtenerUsuarioByUsernameAndPassword(username, password);

      if (userLogin != null) {
        return { success: true, data: userLogin };
      } else {
        return { success: false, message: 'Username y/o Password ingresados son incorrectos.' };
      }
    } catch (error) {
      console.log('Error en ServiceUser.loguearUsuario() --> ', error);
      return { success: false, message: 'Internal Server Error' };
    }
  }



  validarEmailUsuario = async token => {
    try {
      const user = await this.modelUser.obtenerUsuarioByVerificationToken(token)
      if (user) {
        user.isVerified = true
        return await this.modelUser.actualizarUsuario(user._id, user)
      } else {
        const mensajeError = 'Codigo de verificacion invalido'
        console.log(mensajeError)
        return { respuesta: false, error: mensajeError }
      }
    } catch (error) {
      console.log('Error en ServiceUser.validarEmailUsuario() --> ', error)
      return {}
    }
  }

  sendVerificationEmail = async (email, token) => {
    try {
      const emailConfig = {
        service: 'Gmail',
        auth: {
          user: config.GMAIL_USER,
          pass: config.GMAIL_PASSWORD
        }
      }
      const mailOptions = {
        from: config.GMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<a href="http://localhost:8080/api/users/verify/${token}">Verificar Email</a>`
      }

      const transporter = nodemailer.createTransport(emailConfig)
      await transporter.sendMail(mailOptions)
    } catch (error) {
      console.log('Error in ServiceUser.sendVerificationEmail() -->', error)
    }
  }

  registrarUsuario = async user => {
    try {
      const validate = this.validateUser.validarUser(user)
      let userExist = null
      let mensajeError = ''

      if (validate.respuesta) {
        userExist = await this.modelUser.obtenerUsuarioByUsername(user.username)

        if (userExist == null) {
          const verificationToken = crypto.randomBytes(20).toString('hex')
          const userWithVerification = {
            ...user,
            verificationToken,
            isVerified: false
          }
          await this.sendVerificationEmail(user.email, verificationToken)
          const userRegistered = await this.modelUser.guardarUsuario(
            userWithVerification
          )
          return { ...userRegistered, ...validate }
        } else {
          mensajeError =
            'El nombre de usuario ya existe en el sistema, debe ingresar otro.'
          console.log(mensajeError)
          return { respuesta: false, error: mensajeError }
        }
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
