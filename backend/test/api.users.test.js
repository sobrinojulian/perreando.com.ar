import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'

describe('Test /users/', () => {
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

  describe('POST   /users/register', async () => {
    it('debería registrar un usuario correctamente', async () => {
      const usuarioEnviado = {
        username: 'julian',
        email: 'sobrinojulian@protonmail.com',
        password: '123456',
        nombre: 'Julian',
        apellido: 'Sobrino',
        dni: 36904754,
        fechaNacimiento: '1992-07-07',
        telefono: 1163804657,
        direccion: 'cualquiera 123, Almagro',
        role: 'CLIENTE',
        saldo: 3000
      }
      const response = await request
        .post('/api/users/register')
        .send(usuarioEnviado)

      expect(response.status).to.eql(201)

      const usuarioRecibido = response.body
      expect(usuarioRecibido).to.include.keys(
        'username',
        'email',
        'password',
        'nombre',
        'apellido',
        'dni',
        'fechaNacimiento',
        'telefono',
        'direccion',
        'role',
        'saldo',
        'verificationToken',
        'isVerified',
        '_id',
        'respuesta'
      )
      expect(usuarioRecibido.username).to.eql(usuarioEnviado.username)
      expect(usuarioRecibido.email).to.eql(usuarioEnviado.email)
      expect(usuarioRecibido.password).to.eql(usuarioEnviado.password)
      expect(usuarioRecibido.nombre).to.eql(usuarioEnviado.nombre)
      expect(usuarioRecibido.apellido).to.eql(usuarioEnviado.apellido)
      expect(usuarioRecibido.fechaNacimiento).to.eql(
        usuarioEnviado.fechaNacimiento
      )
      expect(usuarioRecibido.telefono).to.eql(usuarioEnviado.telefono)
      expect(usuarioRecibido.direccion).to.eql(usuarioEnviado.direccion)
      expect(usuarioRecibido.role).to.eql(usuarioEnviado.role)
      expect(usuarioRecibido.saldo).to.eql(usuarioEnviado.saldo)
      expect(usuarioRecibido.isVerified).to.be.false
    })
    it('debería fallar al registrar un usuario con un rol vacio', async () => {
      const usuarioEnviado = {
        username: 'julian',
        email: 'sobrinojulian@protonmail.com',
        password: '123456',
        nombre: 'Julian',
        apellido: 'Sobrino',
        dni: 36904754,
        fechaNacimiento: '1992-07-07',
        telefono: 1163804657,
        direccion: 'cualquiera 123, Almagro',
        role: '',
        saldo: 3000
      }

      const response = await request
        .post('/api/users/register')
        .send(usuarioEnviado)
      //.expect(400)

      expect(response.body.respuesta).to.be.false
    })

    // it('debería no permitir registrar un usuario con email o username ya registrado'), async () => {})
  })

  describe('GET    /users/login/:username/:password', () => {
    it('debería devolver un mensaje de éxito para credenciales válidas', async () => {
      const username = 'julian'
      const password = '123456'

      const response = await request.get(
        `/api/users/login/${username}/${password}`
      )
      expect(response.status).to.eql(200)

      //expect(response.body).to.be.an('object')
      //expect(response.body).to.have.property('message', 'Login successful')
      //expect(response.body).to.have.property('username', username)
      expect(response.body.respuesta).to.be.true
    })

    it('debería devolver un mensaje de error para credenciales inválidas', async () => {
      const username = 'noexiste'
      const password = 'invalidpassword'

      const response = await request.get(
        `/api/users/login/${username}/${password}`
      )
      //expect(response.status).to.eql(401)
      //console.log(response.status)

      //expect(response.body).to.be.an('object')
      //expect(response.body).to.have.property('message', 'Invalid username or password')
      expect(response.body.respuesta).to.be.false
    })

    // it('debería no permitir registrar un usuario con email o username ya registrado'), async () => {})
  })

  describe('PUT    /users/edit/:id', () => {})

  describe('DELETE /users/delete/:id', () => {})
  // describe('GET    /users/verify/:verificationToken', () => {})
})
