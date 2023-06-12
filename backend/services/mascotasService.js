import MascotaModel from '../model/DAOs/mascotasModel.js'
import MascotaValidate from '../validations/mascotas.js'

class ServiceMascota {

    constructor() {
        this.modelMascota = new MascotaModel()
        this.validateMascota = new MascotaValidate()
    }

    obtenerMascotasByOwner = async ownerId => {
        try {
            const mascotas = await this.modelMascota.obtenerMascotasByOwner(ownerId)
            return mascotas
        } catch (error) {
            console.log('Error en ServiceMascota.obtenerMascotasByOwner() --> ', error)
            return []
        }
    }

    obtenerMascotasById = async id => {
        try {
            const mascotas = await this.modelMascota.obtenerMascotasById(id)
            return mascotas
        } catch (error) {
            console.log('Error en ServiceMascota.obtenerMascotasById() --> ', error)
            return {}
        }
    }

    obtenerMascotas = async id => {
        try {
            const mascotas = await this.modelMascota.obtenerMascotas()
            return mascotas
        } catch (error) {
            console.log('Error en ServiceMascota.obtenerMascotas() --> ', error)
            return []
        }
    }

    guardarMascota = async mascota => {
        try {
            let mensajeError = ''
            const validate = this.validateMascota.validarMascota(mascota)

            if(validate.respuesta){
                const mascotaSaved = await this.modelMascota.guardarMascota(mascota)
                return {...mascotaSaved, ...validate}
            }else{
                mensajeError = 'Error al guardar la mascota, valide los datos ingresados.'
                console.log(mensajeError)
                return { respuesta: validate.respuesta, error: mensajeError }
            }            
        } catch (error) {
            console.log('Error en ServiceMascota.guardarMascota() --> ', error)
            return {}
        }
    }

    actualizarMascota = async (id, mascota) => {        
        try {
            let mensajeError = ''
            //--- Deconstruir el objeto para no validar el _id ---
            const MascotaA = { name: mascota.name, vaccinated: mascota.vaccinated, size: mascota.size, breed: mascota.breed, weight: mascota.weight, ownerId: mascota.ownerId }
            const validate = this.validateMascota.validarMascota(MascotaA)
            //----------------------------------------------------

            //const validate = this.validateMascota.validarMascota(mascota)

            if(validate.respuesta){
                const mascotaUpdated = await this.modelMascota.actualizarMascota(id, MascotaA)
                return {...mascotaUpdated, ...validate}
            }else{
                mensajeError = 'Error al actualizar la mascota, valide los datos ingresados.'
                console.log(mensajeError)
                return { respuesta: validate.respuesta, error: mensajeError }
            }
        } catch (error) {
            console.log('Error en ServiceMascota.actualizarMascota() --> ', error)
            return {}
        }
    }

    eliminarMascota = async id => {
        try {
            const mascotaDeleted = await this.modelMascota.eliminarMascota(id)
            return mascotaDeleted
        } catch (error) {
            console.log('Error en ServiceMascota.eliminarMascota() --> ', error)
            return {}
        }
    }

}

export default ServiceMascota