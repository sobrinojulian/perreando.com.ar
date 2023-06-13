import DisponibilidadModel from '../model/DAOs/disponibilidadesModel.js'
import UserModel from '../model/DAOs/usersModel.js'
import DispoValidate from '../validations/disponibilidades.js'

class ServiceDisponibilidad {

    constructor() {
        this.role = 'PASEADOR'
        this.modelDisponibilidad = new DisponibilidadModel()
        this.modelUser = new UserModel()
        this.validateDispo = new DispoValidate()
    }

    filtrarPaseadores = async (zona, horario) => {
        let paseadoresCompleto = []
        let listaPaseadores = []
        let paseadoresFiltrados = []
        try {
            let paseadores = await this.modelUser.obtenerUsuarios()
            paseadores = paseadores.filter(u => u.role === this.role)
            let disponibilidad = await this.modelDisponibilidad.obtenerDisponibilidades()

            //Asigno todas las disponibilidades a los usuarios
            paseadores.forEach(paseador => {
                let disponibilidades = disponibilidad.filter(d => d.paseadorId === paseador._id.toString() && d.estado === 0) //Solo los disponibles
                disponibilidades.forEach(dp => {
                    paseadoresCompleto = { ...paseador, ...dp }
                    listaPaseadores = listaPaseadores.concat(paseadoresCompleto)
                })
            })

            //Filtrar por Zona y Horario
            if (horario != 0 && zona != 0) {
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.horario === horario && p.zona === zona))
            } else if (horario != 0) {
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.horario === horario))
            } else if (zona != 0) {
                paseadoresFiltrados = paseadoresFiltrados.concat(listaPaseadores.filter(p => p.zona === zona))
            } else {
                paseadoresFiltrados = listaPaseadores
            }

            return paseadoresFiltrados
        } catch (error) {
            console.log('Error en ServiceDisponibilidad.filtrarPaseadores() --> ', error)
            return []
        }
    }

    obtenerDisponibilidadesByPaseador = async paseadorId => {
        try {
            const paseadores = await this.modelDisponibilidad.obtenerDisponibilidadesByPaseador(paseadorId)
            return paseadores
        } catch (error) {
            console.log('Error en ServiceDisponibilidad.obtenerDisponibilidadesByPaseador() --> ', error)
            return []
        }
    }

    eliminarDisponibilidad = async id => {
        try {
            //Controlar que la disponibilidad que se desea eliminar no esta en estado Contratado (1)
            const disponibilidades = await this.modelDisponibilidad.obtenerDisponibilidadesById(id)
            const estado = disponibilidades.estado

            if (estado == 0) { //Solo se elimina si esta Disponible
                const dispoDeleted = await this.modelDisponibilidad.eliminarDisponibilidad(id)
                return { ...dispoDeleted, ...{ respuesta: true } }
            } else {
                mensajeError = 'No puede eliminar la disponibilidad porque reservada para un paseo.'
                console.log(mensajeError)
                return { respuesta: false, error: mensajeError }
            }
        } catch (error) {
            console.log('Error en ServiceDisponibilidad.eliminarDisponibilidad() --> ', error)
            return {}
        }
    }

    cargarDisponibilidades = async dispo => {
        try {
            //Guardar paseo
            let mensajeError = ''
            let dsCount = null
            const validate = this.validateDispo.validarDispo(dispo)

            if (validate.respuesta) {
                //Validar que no exista el mismo horario ingresado para el mismo paseador
                const disponibilidadesPaseador = await this.modelDisponibilidad.obtenerDisponibilidadesByPaseador(dispo.paseadorId)

                if(disponibilidadesPaseador.length > 0){
                    dsCount = disponibilidadesPaseador.find(d => d.horario === dispo.horario && d.zona === dispo.zona)
                }

                if (dsCount == null) {
                    const disponibilidad = await this.modelDisponibilidad.cargarDisponibilidad(dispo)
                    return { ...disponibilidad, ...{ respuesta: true } }
                } else {
                    mensajeError = 'Ya existe una disponibilidad en el horario ingresado, por favor ingrese otro.'
                    console.log(mensajeError)
                    return { respuesta: false, error: mensajeError }
                }
            } else {
                mensajeError = 'Error al grabar la disponibilidad del paseador, valide los datos ingresados.'
                console.log(mensajeError)
                return { respuesta: validate.respuesta, error: mensajeError }
            }

        } catch (error) {
            console.log('Error en ServiceDisponibilidad.cargarDisponibilidades() --> ', error)
            return {}
        }
    }

}

export default ServiceDisponibilidad