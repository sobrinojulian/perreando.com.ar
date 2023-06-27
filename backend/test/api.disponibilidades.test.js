import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'

describe('Test /disponibilidades/', () => {
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

  describe('GET    /disponibilidades/:paseadorId', () => {})
  describe('GET    /disponibilidades/:zona?/:horario?', () => {})
  describe('DELETE /disponibilidades/delete/:id', () => {})
  describe('POST   /disponibilidades/cargar', () => {})
})
