import { ObjectId } from 'mongodb'
import ConnectionMongoDB from '../ConnectionMongoDB.js'

class User {
  constructor() {}

  obtenerUsuarioByUsername = async username => {
    try {
      if (!ConnectionMongoDB.connection) return id ? {} : []

      const user = await ConnectionMongoDB.db
        .collection('usuarios')
        .findOne({ username: username })
      return user
    } catch (error) {
      console.log('Error en User.obtenerUsuarioByUsername() --> ', error)
      return {}
    }
  }

  obtenerUsuarioByUsernameAndPassword = async (username, password) => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const user = await ConnectionMongoDB.db
        .collection('usuarios')
        .findOne({ username: username, password: password })
      return user
    } catch (error) {
      console.log('Error en User.obtenerUsuarioByUsernameAndPassword() --> ', error)
      return {}
    }
  }

  obtenerUsuarioByVerificationToken = async verificationToken => {
    try {
      if (!ConnectionMongoDB.connection) return null

      console.log(verificationToken)
      const user = await ConnectionMongoDB.db
        .collection('usuarios')
        .findOne({ verificationToken: verificationToken })
      console.log(user)
      return user
    } catch (error) {
      console.log(
        'Error in User.obtenerUsuarioByVerificationToken() -->',
        error
      )
      return null
    }
  }

  obtenerUsuarios = async id => {
    try {
      if (!ConnectionMongoDB.connection) return id ? {} : []

      if (id) {
        const user = await ConnectionMongoDB.db
          .collection('usuarios')
          .findOne({ _id: new ObjectId(id) })
        return user
      } else {
        const users = await ConnectionMongoDB.db
          .collection('usuarios')
          .find()
          .toArray()
        return users
      }
    } catch (error) {
      console.log('Error en User.obtenerUsuarios() --> ', error)
      return id ? {} : []
    }
  }

  guardarUsuario = async user => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db.collection('usuarios').insertOne(user)
      return user
    } catch (error) {
      console.log('Error en User.guardarUsuario() --> ', error)
      return {}
    }
  }

  actualizarUsuario = async (id, user) => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db
        .collection('usuarios')
        .updateOne({ _id: new ObjectId(id) }, { $set: user })

      const userUpdated = await this.obtenerUsuarios(id)
      return userUpdated
    } catch (error) {
      console.log('Error en User.actualizarUsuario() --> ', error)
      return {}
    }
  }

  eliminarUsuario = async id => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const userDeleted = await this.obtenerUsuarios(id)
      await ConnectionMongoDB.db
        .collection('usuarios')
        .deleteOne({ _id: new ObjectId(id) })

      return userDeleted
    } catch (error) {
      console.log('Error en User.eliminarUsuario() --> ', error)
      return {}
    }
  }
}

export default User
