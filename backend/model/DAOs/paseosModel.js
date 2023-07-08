import { ObjectId } from 'mongodb'
import ConnectionMongoDB from '../ConnectionMongoDB.js'

class Paseo {
  constructor() {}

  obtenerPaseosByCliente = async clienteId => {
    try {
      let paseos = []
      if (!ConnectionMongoDB.connection) return []

      if (clienteId) {
        paseos = await ConnectionMongoDB.db
          .collection('paseos')
          .find({ clienteId: clienteId })
          .toArray()
      } else {
        paseos = await ConnectionMongoDB.db
          .collection('paseos')
          .find()
          .toArray()
      }
      return paseos
    } catch (error) {
      console.log('Error en Paseo.obtenerPaseosByCliente() --> ', error)
      return []
    }
  }

  obtenerPaseosByPaseador = async paseadorId => {
    try {
      let paseos = []
      if (!ConnectionMongoDB.connection) return []

      if (paseadorId) {
        paseos = await ConnectionMongoDB.db
          .collection('paseos')
          .find({ paseadorId: paseadorId })
          .toArray()
      } else {
        paseos = await ConnectionMongoDB.db
          .collection('paseos')
          .find()
          .toArray()
      }
      return paseos
    } catch (error) {
      console.log('Error en Paseo.obtenerPaseosByPaseador() --> ', error)
      return []
    }
  }

  obtenerPaseosByMascota = async mascotaId => {
    try {
      let paseos = []
      if (!ConnectionMongoDB.connection) return []

      if (mascotaId) {
        paseos = await ConnectionMongoDB.db
          .collection('paseos')
          .find({ mascotaId: mascotaId })
          .toArray()
      } else {
        paseos = await ConnectionMongoDB.db
          .collection('paseos')
          .find()
          .toArray()
      }
      return paseos
    } catch (error) {
      console.log('Error en Paseo.obtenerPaseosByMascota() --> ', error)
      return []
    }
  }

  obtenerPaseoById = async id => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const paseo = await ConnectionMongoDB.db
        .collection('paseos')
        .findOne({ _id: new ObjectId(id) })
      return paseo
    } catch (error) {
      console.log('Error en Paseo.obtenerPaseoById() --> ', error)
      return {}
    }
  }

  obtenerPaseos = async () => {
    try {
      if (!ConnectionMongoDB.connection) return []

      const paseos = await ConnectionMongoDB.db
        .collection('paseos')
        .find()
        .toArray()
      return paseos
    } catch (error) {
      console.log('Error en Paseo.obtenerPaseos() --> ', error)
      return []
    }
  }

  guardarPaseo = async paseo => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db.collection('paseos').insertOne(paseo)
      return paseo
    } catch (error) {
      console.log('Error en Paseo.guardarPaseo() --> ', error)
      return {}
    }
  }

  actualizarPaseo = async (id, paseo) => {
    try {
      if (!ConnectionMongoDB.connection) return {};

      const paseoId = new ObjectId(id);
      const updatedPaseo = { $set: paseo };

      await ConnectionMongoDB.db
        .collection('paseos')
        .updateOne({ _id: paseoId }, updatedPaseo);

      return paseo;
    } catch (error) {
      console.log('Error en Paseo.actualizarPaseo() --> ', error);
      return {};
    }
  };

}

export default Paseo
