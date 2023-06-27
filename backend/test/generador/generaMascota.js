import { faker } from '@faker-js/faker/locale/en'

const datosTest = () => ({
  name: 'Teddy',
  vaccinated: false,
  size: 'small',
  weight: '21kg',
  ownerId: '648675576abf1e23fda5a611'
})

const getMascota = () => ({
  name: datosTest().name,
  vaccinated: datosTest().vaccinated,
  size: datosTest().size,
  breed: faker.animal.dog(),
  weight: datosTest().weight,
  ownerId: datosTest().ownerId
})

export default {
  getMascota
}
