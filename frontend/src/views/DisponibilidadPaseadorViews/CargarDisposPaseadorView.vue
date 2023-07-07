<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import paseadorService from "../../services/disponibilidadService.js";

export default {
  setup() {
    const storeUser = useUserStore();
    const { user } = storeToRefs(storeUser);
    const ubicaciones = [
      "Almagro",
      "Balvanera",
      "Barracas",
      "Belgrano",
      "Boedo",
      "Caballito",
      "Chacarita",
      "Coghlan",
      "Colegiales",
      "Constitución",
      "Flores",
      "Floresta",
      "La Boca",
      "Liniers",
      "Mataderos",
      "Monte Castro",
      "Montserrat",
      "Nueva Pompeya",
      "Nuñez",
      "Palermo",
      "Parque Avellaneda",
      "Parque Chacabuco",
      "Parque Patricios",
      "Puerto Madero",
      "Recoleta",
      "Retiro",
      "Saavedra",
      "San Cristobal",
      "San Nicolás",
      "San Telmo",
      "Velez Sarsfield",
      "Versalles",
      "Villa Crespo",
      "Villa del Parque",
      "Villa Devoto",
      "Villa Lugano",
      "Villa Luro",
      "Villa Ortúzar",
      "Villa Pueyrredón",
      "Villa Real",
      "Villa Riachuelo",
      "Villa Santa Rita",
      "Villa Soldati",
      "Villa Urquiza",
    ];
    return {
      user,
      ubicaciones,
    };
  },
  data() {
    return {
      vue: this,
      dispo: {
        zona: "",
        horario: "",
        precio: 0,
        estado: 0,
        paseadorId: this.user.id,
      },
    };
  },
  methods: {
    cargar: (vue) => {
      paseadorService
        .cargarDisponibilidad(vue.dispo)
        .then((response) => {
          if (response.data.respuesta) {
            alert("Disponibilidad generada correctamente.");
            vue.$router.push("/disponibilidadPaseador");
          } else {
            alert(response.data.error);
          }
        })
        .catch((error) => {
          alert("Error: No se genero la disponibilidad.");
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Cargar Disponibilidad</h2>
    <hr />

    <form @submit.prevent="cargar(vue)">
      <input
        v-model="dispo.zona"
        type="text"
        class="form-control"
        id="location"
        placeholder="Location"
        required
        list="ubicacionesList"
      />
      <datalist id="ubicacionesList">
        <option v-for="ubicacion in ubicaciones" :value="ubicacion"></option>
      </datalist>
      <br />

      <div class="form-group">
        <h5>Horario (De 09:00hs a 21:00hs)</h5>
        <select v-model="dispo.horario" class="form-control" id="role" required>
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
      <br />

      <div class="form-group">
        <h5>
          Precio: $<label>{{ dispo.precio }}</label>
        </h5>
        <input
          v-model="dispo.precio"
          type="number"
          class="form-control"
          id="price"
          placeholder="Price"
          required
        />
      </div>

      <br />
      <button type="submit" class="btn btn-primary" style="margin-right: 10px">
        Cargar
      </button>
      <RouterLink to="/disponibilidadPaseador">
        <button class="btn btn-primary" style="margin-right: 10px">
          Volver
        </button>
      </RouterLink>
    </form>
  </div>
</template>
