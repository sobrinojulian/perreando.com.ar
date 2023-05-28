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

}

export default ControllerPaseador