import ForecastService from '../services/forecastService.js'

class ForecastController {
  async getForecastData(req, res) {
    const { neighborhood } = req.params

    try {
      const forecastData = await ForecastService.fetchForecastData(neighborhood)
      res.status(200).json(forecastData)
    } catch (error) {
      console.log('Error en ForecastController.getForecastData() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ForecastController
