import MascotaModel from '../model/DAOs/mascotasModel.js'

class ServiceMascota {

    constructor() {
        this.model = new MascotaModel()
    }

    obtenerMascotas = async ownerId => {
        try {
            const mascotas = await this.model.obtenerMascotas(ownerId)
            return mascotas
        } catch (error) {
            console.log('Error en ServiceMascota.obtenerMascotas() --> ', error)
        }
    }

    guardarMascota = async mascota => {
        try {
            const mascotaSaved = await this.model.guardarMascota(mascota)
            return mascotaSaved
        } catch (error) {
            console.log('Error en ServiceMascota.guardarMascota() --> ', error)
        }
    }

    actualizarMascota = async mascota => {
        try {
            const mascotaUpdated = await this.model.actualizarMascota(mascota)
            return mascotaUpdated
        } catch (error) {
            console.log('Error en ServiceMascota.actualizarMascota() --> ', error)
        }
    }

    eliminarMascota = async id => {
        try {
            const mascotaDeleted = await this.model.eliminarMascota(id)
            return mascotaDeleted
        } catch (error) {
            console.log('Error en ServiceMascota.eliminarMascota() --> ', error)
        }
    }

}

export default ServiceMascota