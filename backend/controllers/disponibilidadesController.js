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

      res.json(paseadores)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.filtrarPaseadores() --> ',
        error
      )
    }
  }

  obtenerDisponibilidadesByPaseador = async (req, res) => {
    try {
      const paseadorId = req.params.paseadorId
      const paseadores = await this.service.obtenerDisponibilidadesByPaseador(
        paseadorId
      )
      res.json(paseadores)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.obtenerDisponibilidadesByPaseador() --> ',
        error
      )
    }
  }

  eliminarDisponibilidad = async (req, res) => {
    try {
      const id = req.params.id
      const dispoDeleted = await this.service.eliminarDisponibilidad(id)
      res.json(dispoDeleted)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.eliminarDisponibilidad() --> ',
        error
      )
    }
  }

  cargarDisponibilidades = async (req, res) => {
    try {
      const dispo = req.body
      const disponibilidad = await this.service.cargarDisponibilidades(dispo)
      res.json(disponibilidad)
    } catch (error) {
      console.log(
        'Error en ControllerDisponibilidad.cargarDisponibilidades() --> ',
        error
      )
    }
  }
}

export default ControllerDisponibilidad
