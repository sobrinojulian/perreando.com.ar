import { MongoClient } from 'mongodb'
import config from '../config.js'

class ConnectionMongoDB {
  static client = null
  static connection = false
  static db = null

  static conectar = async () => {
    try {
      console.log('Conectando a la Base de Datos...')
      ConnectionMongoDB.client = new MongoClient(config.STRCNX, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      await ConnectionMongoDB.client.connect()
      console.log('Base de datos conectada')

      ConnectionMongoDB.connection = true
      ConnectionMongoDB.db = ConnectionMongoDB.client.db(config.DB)
    } catch (error) {
      console.log('Error en la conexion de Base de datos: ' + error.message)
    }
  }

  static desconectar = async () => {
    if (!ConnectionMongoDB.connection) return
    await ConnectionMongoDB.client.close()
  }
}

export default ConnectionMongoDB
