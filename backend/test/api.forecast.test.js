import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'

describe('Test /forecast/', () => {
  let server
  let app
  let request

  before(async () => {
    server = new Server(config.PORT)
    app = await server.start()
    request = supertest(app)
  })

  after(async () => {
    await server.stop()
  })

  describe('GET /api/forecast/:neighborhood', () => {
    it('debería devolver los datos del pronóstico para un barrio específico', async () => {
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
    it('debería devolver un arreglo vacío para un barrio inexistente.', async () => {
      const neighborhood = 'unrealneighborhood'
      const response = await request.get(`/api/forecast/${neighborhood}`)
      expect(response.status).to.eql(404)

      const forecast = response.body
      expect(forecast).to.be.an('array')
      expect(forecast).to.have.lengthOf(0)
    })
  })
})
