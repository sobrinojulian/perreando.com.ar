import fs from 'fs'

class Mascota {

    constructor() {
        this.MASCOTASFILE = '../backend/files/mascotas.json'
    }

    getNewId = mascotas => {
        const longitud = mascotas.length
        const newId = (mascotas[longitud - 1]?.id || 0) + 1
        return newId
    }

    async readFile() {
        return await fs.promises.readFile(this.MASCOTASFILE, 'utf-8')
    }

    async writeFile(mascotas) {
        await fs.promises.writeFile(this.MASCOTASFILE, JSON.stringify(mascotas, null, '\t'))
    }

    obtenerMascotas = async id => {
        try {
            const mascotas = JSON.parse(await this.readFile())

            if (id) {
                const mascota = mascotas.find(m => m.id == id)
                return mascota || {}
            } else {
                return mascotas
            }
        } catch (error) {
            console.log('Error en Mascota.obtenerMascotas() --> ', error)
            return id ? {} : []
        }
    }

    guardarMascota = async mascota => {
        try {
            let mascotas = []
            try {
                mascotas = JSON.parse(await this.readFile())
            } catch { }

            const id = this.getNewId(mascotas)
            const newMascota = { id, ...mascota }
            mascotas.push(newMascota)
            await this.writeFile(mascotas)
            return newMascota
        } catch (error) {
            console.log('Error en Mascota.guardarMascota() --> ', error)
            return {}
        }

    }

    actualizarMascota = async mascota => {
        try {
            let mascotas = []
            try {
                mascotas = JSON.parse(await this.readFile())
            } catch { }

            const index = mascotas.findIndex(m => m.id === mascota.id)
            if (index != -1) { //Retorna -1 sino existe el id ingresado
                const oldMascota = mascotas[index]
                const newMascota = { ...oldMascota, ...mascota }
                mascotas.splice(index, 1, newMascota)
                await this.writeFile(mascotas)
                return newMascota
            } else {
                console.log('No existe la mascota a actualizar')
            }
        } catch (error) {
            console.log('Error en Mascota.actualizarMascota() --> ', error)
            return {}
        }
    }

    eliminarMascota = async id => {
        try {
            let mascotas = []
            try {
                mascotas = JSON.parse(await this.readFile())
            } catch { }

            const index = mascotas.findIndex(m => m.id === id)
            if (index != -1) { //Retorna -1 sino existe el id ingresado
                const mascota = mascotas.splice(index, 1)[0]
                await this.writeFile(mascotas)
                return mascota
            } else {
                console.log('No existe la mascota a eliminar')
            }
        } catch (error) {
            console.log('Error en Mascota.eliminarMascota() --> ', error)
            return {}
        }
    }

}

export default Mascota