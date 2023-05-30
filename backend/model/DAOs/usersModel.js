import fs from 'fs'

class User {
    
    constructor(){
        this.USERSPATH = '../backend/files/users.json'
    }

    getNewUserId = users =>{
        const longitud = users.length
        const newId = (users[longitud - 1]?.id || 0) + 1    
        return newId
    }

    async readFile(){
        return await fs.promises.readFile(this.USERSPATH, 'utf-8')
    }

    async writeFile(users){
        await fs.promises.writeFile(this.USERSPATH, JSON.stringify(users, null, '\t'))
    }

    obtenerUsuarios = async username => {
        try {
            const users = JSON.parse(await this.readFile())
            console.log(users);

            if(username){
                const user = users.find(u => u.username == username)
                return user || {}
            }else{
                return users
            }
        }catch{
            return username ? {} : []
        }
    }

    guardarUsuario = async user => {
        let users = []
        try{
            users = JSON.parse(await this.readFile())
        }catch {}

        const id = this.getNewUserId(users)
        const newUser = {id, ...user}
        users.push(newUser)
        await this.writeFile(users)
        return newUser
    }

    actualizarUsuario = async user => {
        let users = []
        try{
            users = JSON.parse(await this.readFile())
        }catch {}

        const index = users.findIndex(u => u.username === user.username)
        if(index != -1){ //Retorna -1 sino existe el id ingresado
            const oldUser = users[index]
            const newUser = {...oldUser, ...user}
            users.splice(index, 1, newUser)
            await this.writeFile(users)
            return newUser
        }else{
            console.log('No existe el usuario a actualizar')
        }
    }

    eliminarUsuario = async username => {
        let users = []
        try{
            users = JSON.parse(await this.readFile())
        }catch {}

        const index = users.findIndex(u => u.username === username)
        if(index != -1){ //Retorna -1 sino existe el id ingresado
            const user = users.splice(index, 1)[0]
            await this.writeFile(users)
            return user
        }else{
            console.log('No existe el usuario a eliminar')
        }
    }

}

export default User