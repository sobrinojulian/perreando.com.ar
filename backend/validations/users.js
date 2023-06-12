import Joi from 'joi'

class UserValidate {

    constructor() { }

    validarUser = user => {
        // const userSchema = Joi.object({
        //     username: Joi.string().required(),
        //     email: Joi.string().required(),
        //     password: Joi.string().required(),
        //     nombre: Joi.string().required(),
        //     apellido: Joi.string().required(),
        //     dni: Joi.number().required(),
        //     fechaNacimiento: Joi.date().required(),
        //     telefono: Joi.number().required(),
        //     direccion: Joi.string().required(),
        //     role: Joi.string().uppercase().required(),
        //     saldo: Joi.number().min(0).required()
        // })
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

        if(error){
            return { respuesta: false, error }
        }
        return { respuesta: true }
    }

}

export default UserValidate