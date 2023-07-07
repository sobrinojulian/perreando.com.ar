<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import userService from "../../services/userService.js";

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
      direccion: {
        calle: "",
        zona: "",
      },
      user: {
        username: "",
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        telefono: "",
        direccion: "",
        role: "",
        saldo: 0,
      },
    };
  },
  methods: {
    registrar: (user, vue) => {
      user.direccion = `${vue.direccion.calle}, ${vue.direccion.zona}`;
      userService
        .registerUser(user)
        .then((response) => {
          if (response.data.respuesta) {
            vue.user.id = response.data._id;
            vue.user.username = response.data.username;
            vue.user.email = response.data.email;
            vue.user.password = response.data.password;
            vue.user.nombre = response.data.nombre;
            vue.user.apellido = response.data.apellido;
            vue.user.dni = response.data.dni;
            vue.user.fechaNacimiento = response.data.fechaNacimiento;
            vue.user.telefono = response.data.telefono;
            vue.user.direccion = response.data.direccion;
            vue.user.role = response.data.role;
            vue.user.saldo = response.data.saldo;
            alert("Usuario registrado correctamente.");
            vue.$router.push("/");
          } else {
            alert(response.data.error);
          }
        })
        .catch((error) => {
          alert("Error: Valide los datos ingresados.");
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Registro de usuario</h2>
    <hr />

    <form @submit.prevent="registrar(user, vue)">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>

      <!-- Datos Personales de usuario -->
      <br />
      <h5 class="mb-4">Datos Personales</h5>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          v-model="user.nombre"
          type="text"
          class="form-control"
          id="nombre"
          placeholder="Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input
          v-model="user.apellido"
          type="text"
          class="form-control"
          id="apellido"
          placeholder="Last Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="dni">DNI:</label>
        <input
          v-model="user.dni"
          type="number"
          class="form-control"
          id="dni"
          placeholder="DNI"
          required
        />
      </div>

      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          v-model="user.fechaNacimiento"
          type="date"
          class="form-control"
          id="fechaNacimiento"
          placeholder="Date of Birth"
          required
        />
      </div>

      <!-- Datos de Contacto de usuario -->
      <br />
      <h5 class="mb-4">Contacto</h5>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Email Address"
          required
        />
      </div>

      <div class="form-group">
        <label for="telefono">Telefono:</label>
        <input
          v-model="user.telefono"
          type="number"
          class="form-control"
          id="telefono"
          placeholder="Phone Number"
          required
        />
      </div>

      <!-- Datos de Direccion de usuario -->
      <br />
      <h5 class="mb-4">Ubicacion</h5>

      <div class="form-group">
        <label for="direccion">Direccion:</label>
        <input
          v-model="direccion.calle"
          type="text"
          class="form-control"
          id="calle"
          placeholder="Street Address"
          required
        />

        <label for="location">Zona:</label>
        <input
          v-model="direccion.zona"
          type="text"
          class="form-control"
          id="location"
          placeholder="Location"
          list="ubicacionesList"
          required
        />
        <datalist id="ubicacionesList">
          <option v-for="ubicacion in ubicaciones" :value="ubicacion"></option>
        </datalist>
      </div>

      <!-- Asignar Rol del usuario -->
      <br />
      <h5 class="mb-4">Rol del Usuario</h5>

      <div class="form-group">
        <label for="role">Rol:</label>
        <select v-model="user.role" class="form-control" id="role" required>
          <option value="CLIENTE">Cliente</option>
          <option value="PASEADOR">Paseador</option>
        </select>
      </div>

      <!-- Asignar Saldo del usuario -->
      <br />
      <h5 class="mb-4">Saldo en cuenta del Usuario</h5>
      <div class="form-group" v-if="user.role == 'PASEADOR'">
        <p>Al registrarse como paseador, el saldo inicial es 0</p>
      </div>
      <div class="form-group" v-if="user.role == 'CLIENTE'">
        <p>
          Al registrarse como cliente, debe ingresar el monto con el que puede
          operar para contratar los paseos. Puede aumentar el importe en
          cualquier momento.
        </p>
        <input
          v-model="user.saldo"
          type="number"
          class="form-control"
          id="saldo"
          placeholder="Saldo"
          required
        />
      </div>

      <br />
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
  <br /><br /><br /><br />
</template>
