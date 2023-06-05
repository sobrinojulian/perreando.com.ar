import PaseoModel from '../model/DAOs/paseosModel.js'
import UserModel from '../model/DAOs/usersModel.js'
import PaseadorModel from '../model/DAOs/paseadoresModel.js'
import MascotaModel from '../model/DAOs/mascotasModel.js'

class ServicePaseo {

    constructor() {
        this.modelPaseo = new PaseoModel()
        this.modelUser = new UserModel()
        this.modelPaseador = new PaseadorModel()
        this.modelMascota = new MascotaModel()
    }

    getFechaActual = () => {        
        const fecha = new Date()
        const day = fecha.getDate()
        const month = fecha.getMonth() + 1
        const year = fecha.getFullYear()

        return `${day}/${month}/${year}`
    }

    agregarDatosPersona = (id, usuarios) => {
        const usuario = usuarios.find(u => u.id === id)
        let nombrePersona = usuario.nombre
        let apellidoPersona = usuario.apellido
        let dniPersona = usuario.dni
        let telefonoPersona = usuario.telefono
        let emailPersona = usuario.email

        return { nombrePersona, apellidoPersona, dniPersona, telefonoPersona, emailPersona }
    }

    agregarDatosMascota = (id, mascotas) => {
        const mascota = mascotas.find(m => m.id === id)
        let nombreMascota = mascota.nombre

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
                paseosFilter.push(p)
            })
        }else if(role == 'PASEADOR'){
            paseos = paseos.filter(p => p.paseadorId == id)
            paseos.forEach(p => {
                let persona = this.agregarDatosPersona(p.clienteId, usuarios)
                let mascota = this.agregarDatosMascota(p.mascotaId, mascotas)
                p = { ...p, ...persona, ...mascota }
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
            
            return paseos
        } catch (error) {
            console.log('Error en ServicePaseo.obtenerPaseosProgramados() --> ', error)
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
            
            return paseos
        } catch (error) {
            console.log('Error en ServicePaseo.obtenerPaseosHistorial() --> ', error)
        }
    }

    guardarPaseo = async paseo => {
        try {
            const usuarios = await this.modelUser.obtenerUsuarios()
            const paseadorDisponibilidades = await this.modelPaseador.obtenerDisponibilidades()

            //Aplicar descuento a cliente
            let cliente = usuarios.find(u => u.id === paseo.clienteId)
            cliente.saldo = cliente.saldo - paseo.total
            let clienteModified = await this.modelUser.actualizarUsuario(cliente)

            //Aplicar acreditacion a paseador
            let paseador = usuarios.find(u => u.id === paseo.paseadorId)
            paseador.saldo = paseador.saldo + paseo.total
            let paseadorModified = await this.modelUser.actualizarUsuario(paseador)

            //Cambiar estado de la disponibilidad
            let paseadorDispo = paseadorDisponibilidades.find(d => d.disponibilidadId === paseo.disponibilidadId)
            paseadorDispo.estado = 1 // 0 = Disponible - 1 = Contratado
            let paseadorDispoModified = await this.modelPaseador.actualizarDisponibilidad(paseadorDispo)

            //Guardar fecha del dia
            paseo.fecha = this.getFechaActual()

            const paseoSaved = await this.modelPaseo.guardarPaseo(paseo)
            return paseoSaved
        } catch (error) {
            console.log('Error en ServicePaseo.guardarPaseo() --> ', error)
        }
    }

}

export default ServicePaseo