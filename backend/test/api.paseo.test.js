import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'

describe('Tets /paseos/', () => {
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
  /*
  describe('POST /paseos/', () => {
    it('should create a new paseo', async () => {
      const paseoData = {

      }

      const response = await request
        .post('/paseos/')
        .send(paseoData)
        .expect(201)

      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('paseoId')
    })

    it('should return an error for invalid paseo data', async () => {
      const invalidPaseoData = {}

      const response = await request
        .post('/paseos/')
        .send(invalidPaseoData)
        .expect(400)

      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('error')
    })
  })

  describe('GET /paseos/programados/:role/:id', () => {
    it('should return the programados paseos for a role and id', async () => {
      const role = 'exampleRole'
      const id = 'exampleId'

      const response = await request
        .get(`/paseos/programados/${role}/${id}`)
        .expect(200)

      expect(response.body).to.be.an('array')
    })

    it('should return an empty array for an invalid role and id', async () => {
      const invalidRole = 'invalidRole'
      const invalidId = 'invalidId'

      const response = await request
        .get(`/paseos/programados/${invalidRole}/${invalidId}`)
        .expect(200)

      expect(response.body).to.be.an('array').that.is.empty
    })
  })
  */
  describe('GET /paseos/historial/:role/:id', () => {
    /*
    it('should return the historial paseos for a role and id', async () => {
      const role = 'PASEADOR'
      const id = '1'

      const response = await request
        .get(`/paseos/historial/${role}/${id}`)
        .expect(200)

      expect(response.body).to.be.an('array')
    })
    */

    it('debe devolver un objeto vacia para un rol y id invalido', async () => {
      const invalidRole = 'invalidRole'
      const invalidId = 'invalidId'

      const response = await request
        .get(`/paseos/historial/${invalidRole}/${invalidId}`)
        .expect(404)

      expect(response.body).to.be.an('object').that.is.empty
    })
  })
})
