import fs from 'fs'

class DisponibilidadModel {

    constructor() {
        this.DISPONIBILIDADFILE = '.../backend/files/disponibilidades.json'
    }

    getNewDispoId = disponibilidades => {
        const longitud = disponibilidades.length
        const newId = (disponibilidades[longitud - 1]?.disponibilidadId || 0) + 1
        return newId
    }

    async readFile(path) {
        return await fs.promises.readFile(path, 'utf-8')
    }

    async writeFile(disponibilidades) {
        await fs.promises.writeFile(this.DISPONIBILIDADFILE, JSON.stringify(disponibilidades, null, '\t'))
    }

    obtenerDisponibilidades = async paseadorId => {
        let disponibilidades = []
        try {
            disponibilidades = JSON.parse(await this.readFile(this.DISPONIBILIDADFILE))
        } catch { }

        try {
            if (paseadorId) {
                disponibilidades = disponibilidades.filter(d => d.paseadorId == paseadorId)
                return disponibilidades
            } else {
                return disponibilidades
            }
        } catch (error) {
            console.log('Error en DisponibilidadModel.obtenerDisponibilidades() --> ', error)
            return paseadorId ? {} : []
        }
    }

    actualizarDisponibilidad = async dispo => {
        let disponibilidades = []
        try {
            disponibilidades = JSON.parse(await this.readFile(this.DISPONIBILIDADFILE))
        } catch { }

        try {
            const index = disponibilidades.findIndex(d => d.disponibilidadId === dispo.disponibilidadId)
            if (index != -1) { //Retorna -1 sino existe el id ingresado
                const oldDispo = disponibilidades[index]
                const newDispo = { ...oldDispo, ...dispo }
                disponibilidades.splice(index, 1, newDispo)
                await this.writeFile(disponibilidades)
                return newDispo
            } else {
                console.log('No existe la disponibilidad a actualizar')
            }

        } catch (error) {
            console.log('Error en DisponibilidadModel.actualizarDisponibilidad() --> ', error)
        }

    }

    eliminarDisponibilidad = async disponibilidadId => {
        let disponibilidades = []
        try {
            disponibilidades = JSON.parse(await this.readFile(this.DISPONIBILIDADFILE))
        } catch { }


        try {
            const index = disponibilidades.findIndex(d => d.disponibilidadId == disponibilidadId)
            if (index != -1) { //Retorna -1 sino existe el id ingresado
                const dispo = disponibilidades.splice(index, 1)[0]
                await this.writeFile(disponibilidades)
                return dispo
            } else {
                console.log('No existe la disponibilidad a eliminar')
            }
        } catch (error) {
            console.log('Error en DisponibilidadModel.eliminarDisponibilidad() --> ', error)
        }
    }

    cargarDisponibilidad = async disponibilidad => {        
        let disponibilidades = []
        try {
            disponibilidades = JSON.parse(await this.readFile(this.DISPONIBILIDADFILE))
        } catch { }

        try {
            const disponibilidadId = this.getNewDispoId(disponibilidades)
            const newdisponibilidad = { disponibilidadId, ...disponibilidad }
            disponibilidades.push(newdisponibilidad)
            await this.writeFile(disponibilidades)
            return newdisponibilidad
        } catch (error) {
            console.log('Error en DisponibilidadModel.cargarDisponibilidad() --> ', error)
            return {}
        }
    }

}

export default DisponibilidadModel