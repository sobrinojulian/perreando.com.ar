<template>
  <div>
    <!-- Componente para agregar una nueva zona -->
    <form @submit="agregarZona">
      <input v-model="nombreZona" type="text" placeholder="Nombre de la zona" />
      <button type="submit">Agregar Zona</button>
    </form>

    <!-- Listado de zonas -->
    <ul>
      <li v-for="(zona, index) in zonas" :key="index">
        {{ zona }}
        <button @click="eliminarZona(index)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useZonaStore } from '../stores/zona';

export default {
  setup() {
    const zonaStore = useZonaStore();

    const nombreZona = ref('');

    const agregarZona = () => {
      zonaStore.agregarZona(nombreZona.value);
      nombreZona.value = '';
    };

    const eliminarZona = (index) => {
      zonaStore.eliminarZona(index);
    };

    return {
      nombreZona,
      zonas: zonaStore.zonas,
      agregarZona,
      eliminarZona,
    };
  },
};
</script>
