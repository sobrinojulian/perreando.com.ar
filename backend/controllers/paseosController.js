import PaseoService from '../services/paseosService.js'

class ControllerPaseo {

    constructor() {
        this.service = new PaseoService()
    }

    obtenerPaseosProgramados = async (req, res) => {
        try {
            const role = req.params.role
            const id = req.params.id
            const paseos = await this.service.obtenerPaseosProgramados(role, id)
            
            res.json(paseos)
        } catch (error) {
            console.log('Error en ControllerPaseo.obtenerPaseosProgramados() --> ', error)
        }
    }

    obtenerPaseosHistorial = async (req, res) => {
        try {
            const role = req.params.role
            const id = req.params.id
            const paseos = await this.service.obtenerPaseosHistorial(role, id)

            res.json(paseos)
        } catch (error) {
            console.log('Error en ControllerPaseo.obtenerPaseosHistorial() --> ', error)
        }
    }

    guardarPaseo = async (req, res) => {
        try {
            const paseo = req.body
            const paseoSaved = await this.service.guardarPaseo(paseo)

            res.json(paseoSaved)
        } catch (error) {
            console.log('Error en ControllerPaseo.guardarPaseo() --> ', error)
        }
    }

}

export default ControllerPaseo