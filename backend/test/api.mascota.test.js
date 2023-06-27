import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'
import generaMascota from './generador/generaMascota.js'

describe('Test /mascotas/', () => {
  let server
  let app
  let request

  const ownerId = '648675576abf1e23fda5a611'

  before(async () => {
    server = new Server(config.PORT)
    app = await server.start()
    request = supertest(app)
  })

  after(async () => {
    await server.stop()
  })

  describe('GET    /api/mascotas/:ownerId', () => {
    it('Consultar mascotas de un mismo dueño, debe retornar codigo de status 200', async () => {
      const response = await request.get(`/api/mascotas/${ownerId}`)
      expect(response.status).to.eql(200)
    })
  })

  describe('GET    /api/mascotas/', () => {})

  describe('POST   /api/mascotas/', () => {
    it('Incorporar una nueva mascota', async () => {
      const mascotaGenerada = generaMascota.getMascota()
      // console.log(mascotaGenerada)

      const response = await request.post('/api/mascotas').send(mascotaGenerada)
      expect(response.status).to.eql(201)

      const mascotaRecibida = response.body
      // console.log(mascotaRecibida)
      expect(mascotaRecibida).to.include.keys(
        'name',
        'vaccinated',
        'size',
        'breed',
        'weight',
        'ownerId'
      )

      expect(mascotaRecibida.name).to.eql(mascotaGenerada.name)
      expect(mascotaRecibida.vaccinated).to.eql(mascotaGenerada.vaccinated)
      expect(mascotaRecibida.size).to.eql(mascotaGenerada.size)
      expect(mascotaRecibida.breed).to.eql(mascotaGenerada.breed)
      expect(mascotaRecibida.weight).to.eql(mascotaGenerada.weight)
      expect(mascotaRecibida.ownerId).to.eql(mascotaGenerada.ownerId)
    })
  })

  describe('POST   /api/mascotas/', () => {})
  describe('PUT    /api/mascotas/:id', () => {})
  describe('DELETE /api/mascotas/:id', () => {})
})
