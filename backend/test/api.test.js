import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import { faker } from '@faker-js/faker'

describe('Server Tests', () => {
  let server
  let app
  let request

  before(async () => {
    server = new Server(8080)
    app = await server.start()
    request = supertest(app)
  })

  after(async () => {
    await server.stop()
  })

  describe('GET /api/forecast/:neighborhood', () => {
    it('should return the forecast data for a specific neighborhood', async () => {
      const neighborhood = 'almagro'
      const response = await request.get(`/api/forecast/${neighborhood}`)
      expect(response.status).to.eql(200)

      const forecast = response.body
      expect(forecast).to.be.an('array')

      forecast.forEach(day => {
        expect(day).to.have.property('date')
        expect(day).to.have.property('temperature_max')
        expect(day).to.have.property('temperature_min')
        expect(day).to.have.property('precipitation_probability_max')
      })
    })
    it('should return an empty array for an unreal neighborhood', async () => {
      const neighborhood = 'unrealneighborhood'
      const response = await request.get(`/api/forecast/${neighborhood}`)
      expect(response.status).to.eql(200)

      const forecast = response.body
      expect(forecast).to.be.an('array')
      expect(forecast).to.have.lengthOf(0)
    })
  })
})
