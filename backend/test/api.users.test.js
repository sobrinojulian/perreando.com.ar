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

  describe('GET    /users/login/:username/:password', () => {})
  describe('POST   /users/register', () => {})
  describe('PUT    /users/edit/:id', () => {})
  describe('DELETE /users/delete/:id', () => {})
  describe('GET    /users/verify/:verificationToken', () => {})
})
