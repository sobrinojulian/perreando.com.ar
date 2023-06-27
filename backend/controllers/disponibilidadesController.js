import DisponibilidadService from '../services/disponibilidadesService.js'

class ControllerDisponibilidad {
  constructor() {
    this.service = new DisponibilidadService()
  }

  filtrarPaseadores = async (req, res) => {
    try {
      const zona = req.params.zona
      const horario = req.params.horario
      const paseadores = await this.service.filtrarPaseadores(zona, horario)

      res.status(200).json(paseadores)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.filtrarPaseadores() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  obtenerDisponibilidadesByPaseador = async (req, res) => {
    try {
      const paseadorId = req.params.paseadorId
      const paseadores = await this.service.obtenerDisponibilidadesByPaseador(
        paseadorId
      )
      res.status(200).json(paseadores)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.obtenerDisponibilidadesByPaseador() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  eliminarDisponibilidad = async (req, res) => {
    try {
      const id = req.params.id
      const dispoDeleted = await this.service.eliminarDisponibilidad(id)
      res.status(200).json(dispoDeleted)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.eliminarDisponibilidad() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  cargarDisponibilidades = async (req, res) => {
    try {
      const dispo = req.body
      const disponibilidad = await this.service.cargarDisponibilidades(dispo)
      res.status(201).json(disponibilidad)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.cargarDisponibilidades() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ControllerDisponibilidad
