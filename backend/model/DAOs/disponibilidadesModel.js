import { ObjectId } from 'mongodb'
import ConnectionMongoDB from '../ConnectionMongoDB.js'

class Disponibilidad {
  constructor() {}

  obtenerDisponibilidadesByPaseador = async paseadorId => {
    try {
      let disponibilidades = []
      if (!ConnectionMongoDB.connection) return paseadorId ? {} : []

      if (paseadorId) {
        disponibilidades = await ConnectionMongoDB.db
          .collection('disponibilidades')
          .find({ paseadorId: paseadorId })
          .toArray()
      } else {
        disponibilidades = await ConnectionMongoDB.db
          .collection('disponibilidades')
          .find()
          .toArray()
      }
      return disponibilidades
    } catch (error) {
      console.log(
        'Error en Disponibilidad.obtenerDisponibilidades() --> ',
        error
      )
      return paseadorId ? {} : []
    }
  }

  obtenerDisponibilidadesById = async id => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const disponibilidad = await ConnectionMongoDB.db
        .collection('disponibilidades')
        .findOne({ _id: new ObjectId(id) })
      return disponibilidad
    } catch (error) {
      console.log(
        'Error en Disponibilidad.obtenerDisponibilidadesById() --> ',
        error
      )
      return {}
    }
  }

  obtenerDisponibilidades = async () => {
    try {
      if (!ConnectionMongoDB.connection) return []

      const disponibilidades = await ConnectionMongoDB.db
        .collection('disponibilidades')
        .find()
        .toArray()
      return disponibilidades
    } catch (error) {
      console.log(
        'Error en Disponibilidad.obtenerDisponibilidades() --> ',
        error
      )
      return []
    }
  }

  eliminarDisponibilidad = async id => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      const dispoDeleted = await this.obtenerDisponibilidadesById(id)
      await ConnectionMongoDB.db
        .collection('disponibilidades')
        .deleteOne({ _id: new ObjectId(id) })

      return dispoDeleted
    } catch (error) {
      console.log(
        'Error en Disponibilidad.eliminarDisponibilidad() --> ',
        error
      )
      return {}
    }
  }

  actualizarDisponibilidad = async (id, dispo) => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db
        .collection('disponibilidades')
        .updateOne({ _id: new ObjectId(id) }, { $set: dispo })

      const dispoUpdated = await this.obtenerDisponibilidadesById(id)
      return dispoUpdated
    } catch (error) {
      console.log(
        'Error en Disponibilidad.actualizarDisponibilidad() --> ',
        error
      )
      return {}
    }
  }

  cargarDisponibilidad = async disponibilidad => {
    try {
      if (!ConnectionMongoDB.connection) return {}

      await ConnectionMongoDB.db
        .collection('disponibilidades')
        .insertOne(disponibilidad)
      return disponibilidad
    } catch (error) {
      console.log('Error en Disponibilidad.cargarDisponibilidad() --> ', error)
      return {}
    }
  }
}

export default Disponibilidad
