import Joi from 'joi'

class DisponibilidadValidate {
  constructor() {}

  validarDispo = dispo => {
    const dispoSchema = Joi.object({
      zona: Joi.string().required(),
      horario: Joi.string().required(),
      precio: Joi.number().required(),
      estado: Joi.number().integer().required(),
      paseadorId: Joi.string().required()
    })

    const { error } = dispoSchema.validate(dispo)

    if (error) {
      return { respuesta: false, error }
    }
    return { respuesta: true }
  }
}

export default DisponibilidadValidate
