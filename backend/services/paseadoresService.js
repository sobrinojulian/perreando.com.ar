import PaseadorModel from '../model/DAOs/paseadoresModel.js'

class ServicePaseador {

    constructor() {
        this.role = 'PASEADOR'
        this.model = new PaseadorModel()
    }

    filtrarPaseadores = async (zona, horario) => {
        let paseadoresCompleto = []
        let listaPaseadores = []
        let paseadoresFiltrados = []
        try {
            let paseadores = await this.model.obtenerUsuarios()//.filter(u => u.role === this.role)
            paseadores = paseadores.filter(u => u.role === this.role)
            let disponibilidad = await this.model.obtenerDisponibilidades()

            //Asigno todas las disponibilidades a los usuarios
            paseadores.forEach(paseador => {
                let disponibilidades = disponibilidad.filter(d => d.paseadorId === paseador.id)
                disponibilidades.forEach(dp => {
                    paseadoresCompleto = { ...paseador, ...dp }
                    listaPaseadores = listaPaseadores.concat(paseadoresCompleto)
                })
            })

            //Filtrar por Horario
            if (horario != 0) {
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.horario === horario))
            }
            //Filtrar por Zona
            if (zona != 0) {
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.zona === zona))
            }

            return paseadoresFiltrados
        } catch (error) {
            console.log('Error en ServicePaseador.filtrarPaseadores() --> ', error)
        }
    }

}

export default ServicePaseador