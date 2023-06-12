<script>
import { storeToRefs } from 'pinia'
import { usePaseadorStore } from '../../stores/paseador.js'
import paseadorService from '../../services/disponibilidadService.js'

export default {
  setup() {
    const storePaseador = usePaseadorStore()
    const { paseador } = storeToRefs(storePaseador)
    const ubicaciones = [
      'Almagro',
      'Balvanera',
      'Barracas',
      'Belgrano',
      'Boedo',
      'Caballito',
      'Chacarita',
      'Coghlan',
      'Colegiales',
      'Constitución',
      'Flores',
      'Floresta',
      'La Boca',
      'Liniers',
      'Mataderos',
      'Monte Castro',
      'Montserrat',
      'Nueva Pompeya',
      'Nuñez',
      'Palermo',
      'Parque Avellaneda',
      'Parque Chacabuco',
      'Parque Patricios',
      'Puerto Madero',
      'Recoleta',
      'Retiro',
      'Saavedra',
      'San Cristobal',
      'San Nicolás',
      'San Telmo',
      'Velez Sarsfield',
      'Versalles',
      'Villa Crespo',
      'Villa del Parque',
      'Villa Devoto',
      'Villa Lugano',
      'Villa Luro',
      'Villa Ortúzar',
      'Villa Pueyrredón',
      'Villa Real',
      'Villa Riachuelo',
      'Villa Santa Rita',
      'Villa Soldati',
      'Villa Urquiza'
    ]
    return {
      paseador,
      ubicaciones
    }
  },
  data() {
    return {
      vue: this,
      zona: "",
      horario: "",
      busquedaRealizada: false,
      textoSearch: "",
      paseadores: [],
      textHelp: ""
    };
  },
  methods: {
    buscar: (zona, horario, vue) => {
      paseadorService.busquedaPaseadores(zona, horario)
        .then(response => {
          vue.paseadores = response.data
          vue.textoSearch = (zona != '' && horario != '') ? "zona y horario" : (zona != '') ? "zona" : (horario != '') ? "horario" : ""
          vue.busquedaRealizada = true
          vue.textHelp = vue.paseadores.length == 0 ? 'No existen paseos disponibles en la zona y/o horario solicitado.' : 'Se listan los paseos disponibles para contratar.'
        })
        .catch(error => {
          alert("Error: No se pudo realizar la busqueda.");
          console.log(error);
        });
    },
    guardarPosibleContrato: (dispoId, vue) => {
      const paseador = vue.paseadores.find(p => p._id === dispoId)
      vue.paseador.paseadorId = paseador.paseadorId
      vue.paseador.nombre = paseador.nombre
      vue.paseador.apellido = paseador.apellido
      vue.paseador.dni = paseador.dni
      vue.paseador.email = paseador.email
      vue.paseador.telefono = paseador.telefono
      vue.paseador.zona = paseador.zona
      vue.paseador.horario = paseador.horario
      vue.paseador.precio = paseador.precio
      vue.paseador.estado = paseador.estado
      vue.paseador.disponibilidadId = paseador._id
    }
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Busqueda</h2>
    <hr>

    <!-- Buscar paseadores -->
    <form @submit.prevent="buscar(zona, horario, vue)">
      <div class="form-group">
        <label for="location">Ubicacion:</label>
        <input v-model="zona" type="text" class="form-control" id="location" placeholder="Location"
          :disabled="busquedaRealizada" list="ubicacionesList">
        <datalist id="ubicacionesList">
          <option v-for="ubicacion in ubicaciones" :value="ubicacion"></option>
        </datalist>
      </div>
      <div class="form-group">
        <label for="time">Horario:</label>
        <select v-model="horario" class="form-control" id="role">
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
        </select>
      </div>

      <br>
      <button v-show="zona != '' || horario != ''" type="submit" class="btn btn-primary" style="margin-right: 10px"
        :disabled="busquedaRealizada">Buscar</button>
    </form>
    <br>

    <!-- Seleccionar de paseadores filtrados -->
    <form v-show="busquedaRealizada">
      <h5 class="mb-4">Paseadores (<a v-if="textoSearch != ''">Busqueda realizada por </a>{{ textoSearch }})</h5>
      <p id="help" class="form-text text-muted">{{ textHelp }}</p>
      <table class="table">
        <thead class="text-light bg-primary">
          <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Dni</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Zona</th>
            <th scope="col">Horario</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in paseadores">
            <th scope="row">
              <RouterLink to="/contratarPaseador">
                <button type="submit" class="btn btn-primary"
                  v-on:click="guardarPosibleContrato(p._id, vue)">Contratar</button>
              </RouterLink>
            </th>
            <td>{{ p.nombre }}</td>
            <td>{{ p.apellido }}</td>
            <td>{{ p.dni }}</td>
            <td>{{ p.telefono }}</td>
            <td>{{ p.email }}</td>
            <td>{{ p.zona }}</td>
            <td>{{ p.horario }}</td>
            <td>{{ p.precio }}</td>
          </tr>
        </tbody>
      </table>
    </form>
    <br>
    <button class="btn btn-primary" v-show="busquedaRealizada" v-on:click="busquedaRealizada = false;
    zona = '';
    horario = '';
    textHelp = '';
    textoSearch = ''">Volver</button>

  </div>
</template>