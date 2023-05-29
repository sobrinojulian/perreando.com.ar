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
        {{ zona.nombre }}
        <button @click="eliminarZona(zona.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, addDoc, deleteDoc } from 'firebase/firestore';

export default {
  setup() {
    const nombreZona = ref('');
    const zonas = ref([]);

    const db = getFirestore();

    const cargarZonas = async () => {
      const zonasCollection = collection(db, 'zonas');
      const snapshot = await getDocs(zonasCollection);
      zonas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    const agregarZona = async (event) => {
      event.preventDefault(); // Evitar recarga de la página
      const nuevaZona = { nombre: nombreZona.value };
      await addDoc(collection(db, 'zonas'), nuevaZona);
      nombreZona.value = '';
      await cargarZonas();
    };

    const eliminarZona = async (id) => {
      await deleteDoc(doc(db, 'zonas', id));
      await cargarZonas();
    };

    onMounted(cargarZonas);

    return {
      nombreZona,
      zonas,
      agregarZona,
      eliminarZona,
    };
  },
};
</script>
