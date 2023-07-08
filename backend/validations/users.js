import Joi from 'joi'

class UserValidate {
  constructor() {}

  validarUser = user => {
    const userSchema = Joi.object({
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      nombre: Joi.string(),
      apellido: Joi.string(),
      dni: Joi.number(),
      fechaNacimiento: Joi.date(),
      telefono: Joi.number(),
      direccion: Joi.string(),
      role: Joi.string().uppercase(),
      saldo: Joi.number().min(0)
    })

    const { error } = userSchema.validate(user)

    if (error) {
      return { success: false, error }
    }
    return { success: true }
  }
}

export default UserValidate
