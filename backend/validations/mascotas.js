import Joi from 'joi'

class MascotaValidate {

    constructor() { }

    validarMascota = mascota => {
        // const mascotaSchema = Joi.object({
        //     name: Joi.string().required(),
        //     vaccinated: Joi.bool().required(),
        //     size: Joi.string().required(),
        //     breed: Joi.string().required(),
        //     weight: Joi.string().required(),
        //     ownerId: Joi.string().required()
        // })
        const mascotaSchema = Joi.object({
            name: Joi.string(),
            vaccinated: Joi.bool(),
            size: Joi.string(),
            breed: Joi.string(),
            weight: Joi.string(),
            ownerId: Joi.string()
        })

        const { error } = mascotaSchema.validate(mascota)

        if(error){
            return { respuesta: false, error }
        }
        return { respuesta: true }
    }

}

export default MascotaValidate