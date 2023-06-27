import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'
import generaMascota from './generaMascota.js'

describe('Test APIREST FUL', () => {

    const ownerId = '648675576abf1e23fda5a611'

    describe('GET', () => {
        it('Consultar mascotas de un mismo dueño, debe retornar codigo de status 200', async () => {
            const server = new Server(config.PORT)
            const app = await server.start()
            const request = supertest(app)

            const response = await request.get(`/api/mascotas/${ownerId}`)
            expect(response.status).to.eql(200)

            await server.stop()
        })
    })

    describe('POST', () => {
        it('Incorporar una nueva mascota', async () => {            
            const server = new Server(config.PORT)
            const app = await server.start()
            const request = supertest(app)

            const mascotaGenerada = generaMascota.getMascota()
            console.log(mascotaGenerada)

            const response = await request.post('/api/mascotas').send(mascotaGenerada)
            expect(response.status).to.eql(200)

            const mascotaRecibida = response.body
            console.log(mascotaRecibida);
            expect(mascotaRecibida).to.include.keys('name', 'vaccinated', 'size', 'breed', 'weight', 'ownerId')

            expect(mascotaRecibida.name).to.eql(mascotaGenerada.name)
            expect(mascotaRecibida.vaccinated).to.eql(mascotaGenerada.vaccinated)
            expect(mascotaRecibida.size).to.eql(mascotaGenerada.size)
            expect(mascotaRecibida.breed).to.eql(mascotaGenerada.breed)
            expect(mascotaRecibida.weight).to.eql(mascotaGenerada.weight)
            expect(mascotaRecibida.ownerId).to.eql(mascotaGenerada.ownerId)
            
            await server.stop()
        })
    })

})