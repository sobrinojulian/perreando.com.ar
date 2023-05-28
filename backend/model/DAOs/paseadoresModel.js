import fs from 'fs'

class PaseadorModel {
    
    constructor(){
        this.role = 'PASEADOR'
        this.USERFILE = '../backend/files/users.json'
        this.DISPONIBILIDADFILE = '../backend/files/disponibilidadPaseador.json'
    }

    async readFile(path){
        return await fs.promises.readFile(path, 'utf-8')
    }

    obtenerPaseadores = async () => {
        let paseadoresCompleto = []
        try {
            let paseadores = JSON.parse(await this.readFile(this.USERFILE)).filter(u => u.role === this.role)
            let disponibilidad = JSON.parse(await this.readFile(this.DISPONIBILIDADFILE))

            paseadores.forEach(paseador => {
                let disponibilidades = disponibilidad.filter(d => d.paseadorId === paseador.id)
                disponibilidades.forEach(dp => {
                    paseadoresCompleto = { paseador, ...dp }
                })
            })

            return paseadoresCompleto
        }catch(error){
            console.log('Error en Paseo.obtenerPaseos() --> ', error)
            return paseadoresCompleto
        }
    }

    obtenerPaseosFiltrados = async (zona, horario) => {
        let paseadoresFiltrados = []

        try {
            const paseadores = await this.obtenerPaseadores()
            paseadoresFiltrados = paseadores

            //Filtar por Horario
            if(horario){
                paseadoresFiltrados = paseadores.filter(p => p.horario === horario)
            }
            //Filtrar por Zona
            if(zona){
                paseadoresFiltrados = paseadores.filter(p => p.zona === zona)
            }
            
            return paseadoresFiltrados
        }catch(error){
            console.log('Error en Paseo.obtenerPaseosFiltrados() --> ', error)
            return paseadoresFiltrados
        }
    }

}

export default PaseadorModel