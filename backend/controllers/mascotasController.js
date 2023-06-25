import MascotaService from '../services/mascotasService.js'

class ControllerMascota {
  constructor() {
    this.serviceMascota = new MascotaService()
  }

  obtenerMascotasByOwner = async (req, res) => {
    try {
      const ownerId = req.params.ownerId
      const mascotas = await this.serviceMascota.obtenerMascotasByOwner(ownerId)

      res.json(mascotas)
    } catch (error) {
      console.log(
        'Error en ControllerMascota.obtenerMascotasByOwner() --> ',
        error
      )
    }
  }

  obtenerMascotasById = async (req, res) => {
    try {
      const id = req.params.id
      const mascotas = await this.serviceMascota.obtenerMascotasById(id)

      res.json(mascotas)
    } catch (error) {
      console.log(
        'Error en ControllerMascota.obtenerMascotasById() --> ',
        error
      )
    }
  }

  obtenerMascotas = async (req, res) => {
    try {
      const mascotas = await this.serviceMascota.obtenerMascotas()

      res.json(mascotas)
    } catch (error) {
      console.log('Error en ControllerMascota.obtenerMascotas() --> ', error)
    }
  }

  guardarMascota = async (req, res) => {
    try {
      const mascota = req.body
      const mascotaSaved = await this.serviceMascota.guardarMascota(mascota)

      res.json(mascotaSaved)
    } catch (error) {
      console.log('Error en ControllerMascota.guardarMascota() --> ', error)
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

      res.json(mascotaUpdated)
    } catch (error) {
      console.log('Error en ControllerMascota.actualizarMascota() --> ', error)
    }
  }

  eliminarMascota = async (req, res) => {
    try {
      const id = req.params.id
      const mascotaDeleted = await this.serviceMascota.eliminarMascota(id)

      res.json(mascotaDeleted)
    } catch (error) {
      console.log('Error en ControllerMascota.eliminarMascota() --> ', error)
    }
  }
}

export default ControllerMascota
