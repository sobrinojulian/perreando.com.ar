import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'

describe('Server Tests', () => {
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

  describe('POST /paseos/', () => {})
  describe('GET  /paseos/programados/:role/:id', () => {})
  describe('GET  /paseos/historial/:role/:id', () => {})
})
