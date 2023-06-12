import fs from 'fs'

class Paseo {
    
    constructor(){
        this.PASEOFILE = '../backend/files/paseos.json'
    }

    getNewPaseoId = paseos =>{
        const longitud = paseos.length
        const newId = (paseos[longitud - 1]?.id || 0) + 1    
        return newId
    }

    async readFile(){
        return await fs.promises.readFile(this.PASEOFILE, 'utf-8')
    }

    async writeFile(paseos){
        await fs.promises.writeFile(this.PASEOFILE, JSON.stringify(paseos, null, '\t'))
    }

    obtenerPaseos = async () => {        
        try {
            const paseos = JSON.parse(await this.readFile())
            return paseos
        } catch (error) {
            console.log('Error en Paseo.obtenerPaseos() --> ', error)
            return []
        }
    }

    guardarPaseo = async paseo => {
        try {
            let paseos = []
            try{
                paseos = JSON.parse(await this.readFile())
            }catch {}
    
            const id = this.getNewPaseoId(paseos)
            const newPaseo = {id, ...paseo}
            paseos.push(newPaseo)
            await this.writeFile(paseos)
            return newPaseo
        } catch (error) {
            console.log('Error en Paseo.guardarPaseo() --> ', error)
        }
    }

}

export default Paseo