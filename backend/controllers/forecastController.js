import ForecastService from '../services/forecastService.js'

class ForecastController {
  async getForecastData(req, res) {
    const { neighborhood } = req.params

    try {
      const forecastData = await ForecastService.fetchForecastData(neighborhood)
      if (forecastData.length !== 0) {
        res.status(200).json(forecastData)
      } else {
        res.status(404).json(forecastData)
      }
    } catch (error) {
      console.log('Error en ForecastController.getForecastData() --> ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ForecastController
