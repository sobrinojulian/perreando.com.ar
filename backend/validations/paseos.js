import Joi from 'joi'

class PaseoValidate {
  constructor() {}

  validarPaseo = paseo => {
    const paseoSchema = Joi.object({
      horario: Joi.string().required(),
      zona: Joi.string().required(),
      precio: Joi.number().required(),
      recargo: Joi.number().required(),
      total: Joi.number().required(),
      fecha: Joi.string().required(),
      paseadorId: Joi.string().required(),
      clienteId: Joi.string().required(),
      paseadorId: Joi.string().required(),
      disponibilidadId: Joi.string().required(),
      mascotaId: Joi.string().required(),
      calificacion: Joi.number().optional()
    })

    const { error } = paseoSchema.validate(paseo)

    if (error) {
      return { respuesta: false, error }
    }
    return { respuesta: true }
  }
}

export default PaseoValidate
