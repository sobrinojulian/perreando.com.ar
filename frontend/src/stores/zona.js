import { defineStore } from "pinia";

export const useZonaStore = defineStore("zona", {
  state: () => ({
    zonas: [],
  }),
  actions: {
    agregarZona(zona) {
      this.zonas.push(zona);
    },
    eliminarZona(index) {
      this.zonas.splice(index, 1);
    },
  },
});
