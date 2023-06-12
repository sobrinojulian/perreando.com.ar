import PaseoModel from '../model/DAOs/paseosModel.js'
import UserModel from '../model/DAOs/usersModel.js'
import DisponibilidadModel from '../model/DAOs/disponibilidadesModel.js'
import MascotaModel from '../model/DAOs/mascotasModel.js'
import PaseoValidate from '../validations/paseos.js'

class ServicePaseo {

    constructor() {
        this.modelPaseo = new PaseoModel()
        this.modelUser = new UserModel()
        this.modelDisponibilidad = new DisponibilidadModel()
        this.modelMascota = new MascotaModel()
        this.validatePaseo = new PaseoValidate()
    }

    getFechaActual = () => {        
        const fecha = new Date()
        const day = fecha.getDate()
        const month = fecha.getMonth() + 1
        const year = fecha.getFullYear()

        return `${day}/${month}/${year}`
    }

    agregarDatosPersona = (id, usuarios) => {
        const usuario = usuarios.find(u => u._id.toString() === id)
        let nombrePersona = usuario.nombre
        let apellidoPersona = usuario.apellido
        let dniPersona = usuario.dni
        let telefonoPersona = usuario.telefono
        let emailPersona = usuario.email
        let direccionPersona = usuario.direccion

        return { nombrePersona, apellidoPersona, dniPersona, telefonoPersona, emailPersona, direccionPersona }
    }

    agregarDatosMascota = (id, mascotas) => {
        const mascota = mascotas.find(m => m._id.toString() === id)
        let nombreMascota = mascota.name

        return { nombreMascota }
    }

    filtrarPorRole = (role, id, paseos, usuarios, mascotas) => {
        let paseosFilter = []

        if(role == 'CLIENTE'){
            paseos = paseos.filter(p => p.clienteId == id)
            paseos.forEach(p => {
                let persona = this.agregarDatosPersona(p.paseadorId, usuarios)
                let mascota = this.agregarDatosMascota(p.mascotaId, mascotas)
                p = { ...p, ...persona, ...mascota }
                p = { ...p, ...persona }
                paseosFilter.push(p)
            })
        }else if(role == 'PASEADOR'){
            paseos = paseos.filter(p => p.paseadorId == id)
            paseos.forEach(p => {
                let persona = this.agregarDatosPersona(p.clienteId, usuarios)
                let mascota = this.agregarDatosMascota(p.mascotaId, mascotas)
                p = { ...p, ...persona, ...mascota }
                p = { ...p, ...persona }
                paseosFilter.push(p)
            })
        }

        return paseosFilter
    }

    obtenerPaseosProgramados = async (role, id) => {
        try {
            const usuarios = await this.modelUser.obtenerUsuarios()
            const mascotas = await this.modelMascota.obtenerMascotas()
            const fecha = this.getFechaActual()
            let paseos = await this.modelPaseo.obtenerPaseos()

            paseos = this.filtrarPorRole(role, id, paseos, usuarios, mascotas) 
            paseos = paseos.filter(p => new Date(p.fecha) >= new Date(fecha))
            paseos = paseos.sort((a,b) => b.fecha.localeCompare(a.fecha))
            paseos = paseos.sort((a,b) => b.horario.localeCompare(a.horario))
            
            return paseos
        } catch (error) {
            console.log('Error en ServicePaseo.obtenerPaseosProgramados() --> ', error)
            return []
        }
    }

    obtenerPaseosHistorial = async (role, id) => {
        try {
            const usuarios = await this.modelUser.obtenerUsuarios()
            const mascotas = await this.modelMascota.obtenerMascotas()
            const fecha = this.getFechaActual()
            let paseos = await this.modelPaseo.obtenerPaseos()

            paseos = this.filtrarPorRole(role, id, paseos, usuarios, mascotas) 
            paseos = paseos.filter(p => new Date(p.fecha) < new Date(fecha))
            paseos = paseos.sort((a,b) => b.fecha.localeCompare(a.fecha))
            paseos = paseos.sort((a,b) => b.horario.localeCompare(a.horario))
            
            return paseos
        } catch (error) {
            console.log('Error en ServicePaseo.obtenerPaseosHistorial() --> ', error)
            return []
        }
    }

    guardarPaseo = async paseo => {
        try {
            //Aplicar descuento a cliente
            const cliente = await this.modelUser.obtenerUsuarios(paseo.clienteId)
            const clienteActualizado = {
                saldo: parseFloat(cliente.saldo) - parseFloat(paseo.total)
            }
            let clienteModified = await this.modelUser.actualizarUsuario(cliente._id, clienteActualizado)

            //Aplicar acreditacion a paseador
            const paseador = await this.modelUser.obtenerUsuarios(paseo.paseadorId)
            const paseadorActualizado = {
                saldo: parseFloat(paseador.saldo) + parseFloat(paseo.total)
            }
            let paseadorModified = await this.modelUser.actualizarUsuario(paseador._id, paseadorActualizado)

            //Cambiar estado de la disponibilidad
            console.log(paseo);
            const paseadorDispo = await this.modelDisponibilidad.obtenerDisponibilidadesById(paseo.disponibilidadId)
            const dispoActualizado = {
                estado: 1 // 0 = Disponible - 1 = Contratado
            }
            console.log(paseadorDispo);
            let paseadorDispoModified = await this.modelDisponibilidad.actualizarDisponibilidad(paseadorDispo._id, dispoActualizado)

            //Guardar fecha del dia
            paseo.fecha = this.getFechaActual()

            //Guardar paseo
            let mensajeError = ''
            const validate = this.validatePaseo.validarPaseo(paseo)

            if(validate.respuesta){
                const paseoSaved = await this.modelPaseo.guardarPaseo(paseo)
                return paseoSaved
            }else{
                mensajeError = 'Error al grabar el paseo.'
                console.log(mensajeError)
                return { respuesta: validate.respuesta, error: mensajeError }
            }            
        } catch (error) {
            console.log('Error en ServicePaseo.guardarPaseo() --> ', error)
            return {}
        }
    }

}

export default ServicePaseo