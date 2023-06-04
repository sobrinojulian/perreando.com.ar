import MascotaService from '../services/mascotasService.js'

class ControllerMascota {

    constructor(){
        this.service = new MascotaService()
    }

    obtenerMascotas = async (req, res) => {
        try{
            const id = req.params.id
            const mascotas = await this.service.obtenerMascotas(id)            
            res.json(mascotas)
        }catch(error){
            console.log('Error en ControllerMascota.obtenerMascotas() --> ', error)
        }
    }

    guardarMascota = async (req, res) => {
        try{
            const mascota = req.body
            const mascotaSaved = await this.service.guardarMascota(mascota)            
            res.json(mascotaSaved)
        }catch(error){
            console.log('Error en ControllerMascota.guardarMascota() --> ', error)
        }
    }

    actualizarMascota = async (req, res) => {
        try{
            const mascota = req.body
            const mascotaUpdated = await this.service.actualizarMascota(mascota)            
            res.json(mascotaUpdated)
        }catch(error){
            console.log('Error en ControllerMascota.actualizarMascota() --> ', error)
        }
    }

    eliminarMascota = async (req, res) => {
        try{
            const id = req.params.id
            const mascotaDeleted = await this.service.eliminarMascota(id)            
            res.json(mascotaDeleted)
        }catch(error){
            console.log('Error en ControllerMascota.eliminarMascota() --> ', error)
        }
    }

}

export default ControllerMascota