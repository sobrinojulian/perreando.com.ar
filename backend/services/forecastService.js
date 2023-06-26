import fetch from 'node-fetch'

class ForecastService {
  static async fetchForecastData(neighborhood) {
    const COUNTRY = 'Argentina'
    const TIMEZONE = 'America/Argentina/Buenos_Aires'

    const geocodeResults = await ForecastService.fetchGeocode(
      neighborhood,
      COUNTRY
    )

    if (geocodeResults.length > 0) {
      const { latitude, longitude } = geocodeResults[0]
      const forecastData = await ForecastService.fetchForecast(
        latitude,
        longitude,
        TIMEZONE
      )
      const convertedData = ForecastService.convertForecastData(forecastData)

      return convertedData
    }

    return []
  }

  static async fetchGeocode(neighborhood, country) {
    const baseUrl = 'https://geocoding-api.open-meteo.com/v1/search'
    const queryParams = [
      `name=${neighborhood}`,
      'count=10',
      'language=es',
      'format=json'
    ]
    const geocodeUrl = `${baseUrl}?${queryParams.join('&')}`

    try {
      const response = await fetch(geocodeUrl)
      const data = await response.json()
      return data.results.filter(result => result.country === country)
    } catch (error) {
      console.log('Error:', error)
      return []
    }
  }

  static async fetchForecast(latitude, longitude, timezone) {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast'
    const queryParams = [
      `latitude=${latitude}`,
      `longitude=${longitude}`,
      'daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      'forecast_days=3',
      `timezone=${encodeURIComponent(timezone)}`
    ]
    const forecastUrl = `${baseUrl}?${queryParams.join('&')}`

    try {
      const response = await fetch(forecastUrl)
      const data = await response.json()
      return data
    } catch (error) {
      console.log('Error:', error)
      return null
    }
  }

  static convertForecastData(forecastData) {
    if (forecastData && forecastData.daily) {
      const { daily } = forecastData
      const forecastList = []

      for (let i = 0; i < daily.time.length; i++) {
        const forecastItem = {
          date: daily.time[i],
          temperature_max: daily.temperature_2m_max[i],
          temperature_min: daily.temperature_2m_min[i],
          precipitation_probability_max: daily.precipitation_probability_max[i]
        }
        forecastList.push(forecastItem)
      }

      return forecastList
    } else {
      return []
    }
  }
}

export default ForecastService
