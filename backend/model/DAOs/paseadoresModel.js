import fs from 'fs'

class PaseadorModel {

    constructor() {
        this.USERFILE = '../backend/files/users.json'
        this.DISPONIBILIDADFILE = '../backend/files/disponibilidadPaseador.json'
    }

    async readFile(path) {
        return await fs.promises.readFile(path, 'utf-8')
    }

    obtenerUsuarios = async () => {
        try {
            const usuarios = JSON.parse(await this.readFile(this.USERFILE))
            return usuarios
        } catch (error) {
            console.log('Error en Paseo.obtenerUsuarios() --> ', error)
            return []
        }
    }

    obtenerDisponibilidades = async () => {
        try {
            const desponibilidades = JSON.parse(await this.readFile(this.DISPONIBILIDADFILE))
            return desponibilidades
        } catch (error) {
            console.log('Error en Paseo.obtenerDisponibilidades() --> ', error)
            return []
        }
    }

}

export default PaseadorModel