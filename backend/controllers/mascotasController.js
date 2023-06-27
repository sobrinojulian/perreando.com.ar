import MascotaService from '../services/mascotasService.js'

class ControllerMascota {
  constructor() {
    this.serviceMascota = new MascotaService()
  }

  obtenerMascotasByOwner = async (req, res) => {
    try {
      const ownerId = req.params.ownerId
      const mascotas = await this.serviceMascota.obtenerMascotasByOwner(ownerId)

      res.status(200).json(mascotas)
    } catch (error) {
      console.log(
        'Error en ControllerMascota.obtenerMascotasByOwner() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  obtenerMascotasById = async (req, res) => {
    try {
      const id = req.params.id
      const mascotas = await this.serviceMascota.obtenerMascotasById(id)

      if (mascotas) {
        res.status(200).json(mascotas)
      } else {
        // res.status(404).json({ error: 'Mascota not found' })
        res.status(404).json(mascotas)
      }
    } catch (error) {
      console.log(
        'Error en ControllerMascota.obtenerMascotasById() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  obtenerMascotas = async (req, res) => {
    try {
      const mascotas = await this.serviceMascota.obtenerMascotas()

      res.status(200).json(mascotas)
    } catch (error) {
      console.log('Error en ControllerMascota.obtenerMascotas() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  guardarMascota = async (req, res) => {
    try {
      const mascota = req.body
      const mascotaSaved = await this.serviceMascota.guardarMascota(mascota)

      res.status(201).json(mascotaSaved)
    } catch (error) {
      console.log('Error en ControllerMascota.guardarMascota() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  actualizarMascota = async (req, res) => {
    try {
      const id = req.params.id
      const mascota = req.body
      const mascotaUpdated = await this.serviceMascota.actualizarMascota(
        id,
        mascota
      )

      if (mascotaUpdated) {
        res.status(200).json(mascotaUpdated)
      } else {
        // res.status(404).json({ error: 'Mascota not found' })
        res.status(404).json(mascotaUpdated)
      }
    } catch (error) {
      console.log('Error en ControllerMascota.actualizarMascota() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  eliminarMascota = async (req, res) => {
    try {
      const id = req.params.id
      const mascotaDeleted = await this.serviceMascota.eliminarMascota(id)

      if (mascotaDeleted) {
        res.status(200).json(mascotaDeleted)
      } else {
        res.status(404).json({ error: 'Mascota not found' })
        //res.status(404).json(mascotaDeleted)
      }
    } catch (error) {
      console.log('Error en ControllerMascota.eliminarMascota() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ControllerMascota
