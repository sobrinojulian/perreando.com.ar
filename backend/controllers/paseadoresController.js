import PaseoService from '../services/paseadoresService.js'

class ControllerPaseador {

    constructor(){
        this.service = new PaseoService()
    }

    filtrarPaseadores = async (req, res) => {
        try{
            const zona = req.params.zona
            const horario = req.params.horario
            const paseadores = await this.service.filtrarPaseadores(zona, horario)
            
            res.json(paseadores)
        }catch(error){
            console.log('Error en ControllerPaseador.filtrarPaseadores() --> ', error)
        }
    }

    obtenerPaseadorDisponibilidades = async (req, res) => {
        try{
            const paseadorId = req.params.id
            const paseadores = await this.service.obtenerPaseadorDisponibilidades(paseadorId)            
            res.json(paseadores)
        }catch(error){
            console.log('Error en ControllerPaseador.obtenerPaseadorDisponibilidades() --> ', error)
        }
    }

    eliminarDisponibilidad = async (req, res) => {
        try{
            const disponibilidadId = req.params.id
            const dispoDeleted = await this.service.eliminarDisponibilidad(disponibilidadId)            
            res.json(dispoDeleted)
        }catch(error){
            console.log('Error en ControllerPaseador.eliminarDisponibilidad() --> ', error)
        }
    }

    cargarDisponibilidades = async (req, res) => {
        try{
            const dispo = req.body
            const disponibilidad = await this.service.cargarDisponibilidades(dispo)            
            res.json(disponibilidad)
        }catch(error){
            console.log('Error en ControllerPaseador.cargarDisponibilidades() --> ', error)
        }
    }

}

export default ControllerPaseador