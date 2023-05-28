import PaseadorModel from '../model/DAOs/paseadoresModel.js'

class ServicePaseador{

    constructor(){
        this.model = new PaseadorModel()
    }

    filtrarPaseadores = async (zona, horario) => {
        try{
            const paseadores = await this.model.obtenerPaseosFiltrados(zona, horario)
            return paseadores

        }catch(error){
            console.log('Error en ServicePaseador.filtrarPaseadores() --> ', error)
        }
    }

}

export default ServicePaseador