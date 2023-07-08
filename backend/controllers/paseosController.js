import PaseoService from '../services/paseosService.js'

class ControllerPaseo {
  constructor() {
    this.service = new PaseoService()
  }

  obtenerPaseosProgramados = async (req, res) => {
    try {
      const role = req.params.role
      const id = req.params.id
      const paseos = await this.service.obtenerPaseosProgramados(role, id)

      res.status(200).json(paseos)
    } catch (error) {
      console.log(
        'Error en ControllerPaseo.obtenerPaseosProgramados() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  obtenerPaseosHistorial = async (req, res) => {
    try {
      const role = req.params.role
      const id = req.params.id
      const paseos = await this.service.obtenerPaseosHistorial(role, id)

      res.status(200).json(paseos)
    } catch (error) {
      console.log(
        'Error en ControllerPaseo.obtenerPaseosHistorial() --> ',
        error
      )
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  guardarPaseo = async (req, res) => {
    try {
      const paseo = req.body
      const paseoSaved = await this.service.guardarPaseo(paseo)

      res.status(201).json(paseoSaved)
    } catch (error) {
      console.log('Error en ControllerPaseo.guardarPaseo() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  calificarPaseo = async (req, res) => {
    try {
      const id = req.params.id
      const calificacion = req.body.calificacion
      await this.service.calificarPaseo(id, calificacion)

      res.status(200).json({ message: 'Calificación saved successfully' })
    } catch (error) {
      console.log('Error in ControllerPaseo.calificarPaseo() -->', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ControllerPaseo
