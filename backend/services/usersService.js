import UserModel from '../model/DAOs/usersModel.js'

class ServiceUser{

    constructor(){
        this.model = new UserModel()
    }

    loguearUsuario = async user => {
        const userLogin = await this.model.obtenerUsuarios(user.username)

        if(JSON.stringify(userLogin) != '{}'){
            if(userLogin.username == user.username && userLogin.password == user.password){
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

        //Validacion de registro de usuario (PENDIENTE)

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

    actualizarUsuario = async (username, user) => {
        const userUpdated = await this.model.actualizarUsuario(username, user)
        return userUpdated
    }

    eliminarUsuario = async username => {
        const userDeleted = await this.model.eliminarUsuario(username)
        return userDeleted
    }

}

export default ServiceUser