import { ObjectId } from 'mongodb'
import ConnectionMongoDB from '../ConnectionMongoDB.js'

class Mascota {
  constructor() {}

  obtenerMascotasByOwner = async ownerId => {
    try {
      let mascotas = []
      if (!ConnectionMongoDB.connection) return ownerId ? {} : []

      if (ownerId) {
        mascotas = await ConnectionMongoDB.db
          .collection('mascotas')
          .find({ ownerId: ownerId })
          .toArray()
      } else {
        mascotas = await ConnectionMongoDB.db
          .collection('mascotas')
          .find()
          .toArray()
      }
      return mascotas
    } catch (error) {
      console.log('Error en Mascota.obtenerMascotasByOwner() --> ', error)
      return ownerId ? {} : []
    }
  }

  obtenerMascotasById = async id => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const mascota = await ConnectionMongoDB.db
        .collection('mascotas')
        .findOne({ _id: new ObjectId(id) })
      return mascota
    } catch (error) {
      console.log('Error en Mascota.obtenerMascotasById() --> ', error)
      return {}
    }
  }

  obtenerMascotas = async () => {
    try {
      if (!ConnectionMongoDB.connection) return []

      const mascotas = await ConnectionMongoDB.db
        .collection('mascotas')
        .find()
        .toArray()
      return mascotas
    } catch (error) {
      console.log('Error en Mascota.obtenerMascotas() --> ', error)
      return []
    }
  }

  guardarMascota = async mascota => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db.collection('mascotas').insertOne(mascota)
      return mascota
    } catch (error) {
      console.log('Error en Mascota.guardarMascota() --> ', error)
      return {}
    }
  }

  actualizarMascota = async (id, mascota) => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db
        .collection('mascotas')
        .updateOne({ _id: new ObjectId(id) }, { $set: mascota })

      const mascotaUpdated = await this.obtenerMascotasById(id)
      return mascotaUpdated
    } catch (error) {
      console.log('Error en Mascota.actualizarMascota() --> ', error)
      return {}
    }
  }

  eliminarMascota = async id => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const mascotaDeleted = await this.obtenerMascotasById(id)
      await ConnectionMongoDB.db
        .collection('mascotas')
        .deleteOne({ _id: new ObjectId(id) })

      return mascotaDeleted
    } catch (error) {
      console.log('Error en Mascota.eliminarMascota() --> ', error)
      return {}
    }
  }
}

export default Mascota
