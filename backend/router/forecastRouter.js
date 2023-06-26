import express from 'express'
import ForecastController from '../controllers/forecastController.js'

class ForecastRouter {
  constructor() {
    this.router = express.Router()
    this.controller = new ForecastController()
  }

  start() {
    this.router.get('/:neighborhood', this.controller.getForecastData)

    return this.router
  }
}

export default ForecastRouter
