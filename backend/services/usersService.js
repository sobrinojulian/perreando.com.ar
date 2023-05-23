import UserModel from '../model/DAOs/usersModel.js'

class ServiceUser{

    constructor(){
        this.model = new UserModel()
    }

    loguearUsuario = async (username, password) => {
        const userLogin = await this.model.obtenerUsuarios(username)

        if(JSON.stringify(userLogin) != '{}'){
            if(userLogin.username === username && userLogin.password === password){
                return userLogin
            }else{
                console.log('Error: Password incorrecta')
                return null
            }
        }else{
            console.log('Error: Username ingresado no existe')
            return null
        }
    }

    registrarUsuario = async user => {
        const userRegistered = await this.model.guardarUsuario(user)
        return userRegistered
    }

    obtenerUsuarios = async username => {
        const users = await this.model.obtenerUsuarios(username)
        return users
    }

    guardarUsuario = async user => {
        const userSaved = await this.model.guardarUsuario(user)
        return userSaved
    }

    actualizarUsuario = async user => {
        try{
            const userUpdated = await this.model.actualizarUsuario(user)
            return userUpdated
        }catch(error){
            console.log('Error en ServiceUser.actualizarUsuario() --> ', error)
        }
    }

    eliminarUsuario = async username => {
        try{
            const userDeleted = await this.model.eliminarUsuario(username)
            return userDeleted
        }catch(error){
            console.log('Error en ServiceUser.eliminarUsuario() --> ', error)
        }
    }

}

export default ServiceUser