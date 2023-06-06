import PaseadorModel from '../model/DAOs/paseadoresModel.js'
import UserModel from '../model/DAOs/usersModel.js'
import moment from 'moment';

class ServicePaseador {

    constructor() {
        this.role = 'PASEADOR'
        this.modelPaseador = new PaseadorModel()
        this.modelUser = new UserModel()
    }

    filtrarPaseadores = async (zona, horario) => {
        let paseadoresCompleto = []
        let listaPaseadores = []
        let paseadoresFiltrados = []
        try {
            let paseadores = await this.modelUser.obtenerUsuarios()//.filter(u => u.role === this.role)
            paseadores = paseadores.filter(u => u.role === this.role)
            let disponibilidad = await this.modelPaseador.obtenerDisponibilidades()

            //Asigno todas las disponibilidades a los usuarios
            paseadores.forEach(paseador => {
                let disponibilidades = disponibilidad.filter(d => d.paseadorId === paseador.id && d.estado === 0) //Solo los disponibles
                disponibilidades.forEach(dp => {
                    paseadoresCompleto = { ...paseador, ...dp }
                    listaPaseadores = listaPaseadores.concat(paseadoresCompleto)
                })
            })

            //Filtrar por Zona y Horario
            if (horario != 0 && zona != 0) {
                console.log(1);
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.horario === horario && p.zona === zona))
            }else if (horario != 0) {
                console.log(2);
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.horario === horario))
            }else if (zona != 0) {
                console.log(3);
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.zona === zona))
            }else {
                console.log(4);
                paseadoresFiltrados = listaPaseadores
            }

            console.log(paseadoresFiltrados);

            return paseadoresFiltrados
        } catch (error) {
            console.log('Error en ServicePaseador.filtrarPaseadores() --> ', error)
        }
    }

    obtenerPaseadorDisponibilidades = async paseadorId => {
        try {
            const paseadores = await this.modelPaseador.obtenerDisponibilidades(paseadorId)
            return paseadores
        } catch (error) {
            console.log('Error en ServicePaseador.obtenerPaseadorDisponibilidades() --> ', error)
        }
    }

    eliminarDisponibilidad = async disponibilidadId => {
        try {
            //Controlar que la disponibilidad que se desea eliminar no esta en estado Contratado (1)
            const disponibilidades = await this.modelPaseador.obtenerDisponibilidades()
            const estado = disponibilidades.find(d => d.disponibilidadId == disponibilidadId).estado

            if (estado == 0) { //Solo se elimina si esta Disponible
                const dispoDeleted = await this.modelPaseador.eliminarDisponibilidad(disponibilidadId)
                return dispoDeleted
            } else {
                console.log('La disponibilidad esta reservada para un paseo');
                return {}

            }
        } catch (error) {
            console.log('Error en ServicePaseador.eliminarDisponibilidad() --> ', error)
        }
    }

    cargarDisponibilidades = async dispo => {
        try {
            const disponibilidad = await this.modelPaseador.cargarDisponibilidad(dispo)
            return disponibilidad
        } catch (error) {
            console.log('Error en ServicePaseador.cargarDisponibilidades() --> ', error)
        }
    }

}

export default ServicePaseador