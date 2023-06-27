import { faker } from '@faker-js/faker/locale/en'

const datosTest = () => ({
    name: 'Teddy',
    vaccinated: false,
    size: 'small',
    weight: '21kg',
    ownerId: '648675576abf1e23fda5a611'
})

const getMascota = () => ({
    name: datosTest().name, /*Nombre para Test*/
    vaccinated: datosTest().vaccinated, /*EstaVacunado para Test*/
    size: datosTest().size, /*Tamanio para Test*/
    breed: faker.animal.dog(),
    weight: datosTest().weight, /*Peso para Test*/
    ownerId: datosTest().ownerId /*OwnerId para Test*/
})

export default {
    getMascota
}